using Google.Apis.Auth;
using Infrastructure.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.V4.Pages.Account.Manage.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Project.Application.AccountData.Commands.DeleteAccountData;
using Project.Application.Common.Interfaces;
using Project.Application.Common.JwtFeatures;
using Project.Application.Common.Models;
using Project.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtHandler _jwtHandler;
        private readonly ICurrentUserService _currentUserService;
        private readonly ILogger<DeletePersonalDataModel> _logger;
        private readonly ISender _mediator;
        private readonly IEmailSender _emailSender;

        public AccountsController(UserManager<ApplicationUser> userManager, JwtHandler jwtHandler, ICurrentUserService currentUserService, ILogger<DeletePersonalDataModel> logger, ISender mediator, IEmailSender emailSender)
        {
            _userManager = userManager;
            _jwtHandler = jwtHandler;
            _currentUserService = currentUserService;
            _logger = logger;
            _mediator = mediator;
            _emailSender = emailSender;
        }


        [HttpGet]
        [Authorize]
        public async Task<ActionResult<ApplicationUser>> Get()
        {
            return await _userManager.FindByIdAsync(_currentUserService.UserId);
        }

        [HttpGet("ConfirmEmail")]
        public async Task<ActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user is null)
                return BadRequest("There is no user with this e-mail");

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(errors);
            }

            return Redirect("/confirmed-email");
        }

        [HttpGet("ResendConfirmationEmail")]
        [Authorize]
        public async Task<ActionResult> ResendConfirmationEmail()
        {
            var user = await _userManager.FindByIdAsync(_currentUserService.UserId);

            if (user is null)
                return Unauthorized();

            await SendConfirmEmailAsync(user.Email);

            return Ok();
        }

        [HttpGet("SendResetPasswordEmail")]
        public async Task<ActionResult> SendResetPasswordEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user is null)
                return BadRequest("There is no user with this e-mail");

            if (!user.EmailConfirmed)
                return StatusCode((int)HttpStatusCode.Forbidden, "This email is not confirmed");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var callbackUrl = Url.Content($"{Request.Scheme}://{Request.Host.Value}/reset-password?token={token}&email={email}");


            string emailContent = new EmailContentCreatorService(
                callbackUrl,
                "If you want to reset your password.",
                "Reset Password"
                ).CreateEmailContent();

            var message = new Message(new string[] { user.Email }, "[MultiStopwatch] Reset your password", emailContent, null);
            await _emailSender.SendEmailAsync(message);

            return Ok();
        }


        [HttpPost("Register")]
        public async Task<ActionResult> Register(UserForRegistration userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest();

            IdentityResult result = await CreateUser(userForRegistration.Email, userForRegistration.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(errors);
            }

            await SendConfirmEmailAsync(userForRegistration.Email);

            return Ok();
        }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login(UserForAuthentication userForAuthentication)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(userForAuthentication.Email);

            if (user is null)
                return BadRequest("There is no user with this e-mail");

            if (!await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return BadRequest("Invalid password");

            var claims = _jwtHandler.GetClamis(user.Email, user.Id);
            string token = _jwtHandler.GenerateToken(claims);

            return Ok(token);
        }

        [HttpPost("GoogleAuthenticate")]
        public async Task<ActionResult<string>> GoogleAuthenticate(string idToken)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new();

            settings.Audience = new List<string>() { "1077472699821-km2iel871mij429reoh6uev8dl6k4v3a.apps.googleusercontent.com" };

            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(idToken, settings).Result;

            ApplicationUser user = await _userManager.FindByEmailAsync(payload.Email);

            if (user is null)
                user = await CreateUser(payload.Email);

            var claims = _jwtHandler.GetClamis(payload.Email, user.Id);
            string token = _jwtHandler.GenerateToken(claims);

            return Ok(token);
        }

        [HttpPost("FacebookAuthenticate")]
        public async Task<ActionResult<string>> FacebookAuthenticate(string email, string name, string id, string authToken)
        {
            var facebookAuthCheck = await GetFacebookAuthCheck(authToken);

            if (facebookAuthCheck is null)
                return StatusCode((int)HttpStatusCode.FailedDependency);

            string facebookAuthCheckName = facebookAuthCheck["name"]?.Value<string>();
            string facebookAuthCheckId = facebookAuthCheck["id"]?.Value<string>();

            if (facebookAuthCheckName != name || facebookAuthCheckId != id)
            {
                string facebookAuthErrorMessage = facebookAuthCheck["error"]["message"].Value<string>();
                return BadRequest(facebookAuthErrorMessage);
            }

            ApplicationUser user = await _userManager.FindByEmailAsync(email);

            if (user is null)
                user = await CreateUser(email);

            var claims = _jwtHandler.GetClamis(email, user.Id);
            string token = _jwtHandler.GenerateToken(claims);

            return Ok(token);
        }

        [HttpPut("ResetPassword")]
        public async Task<ActionResult> ResetPassword(string email, string token, string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user is null)
                return BadRequest("There is no user with this e-mail");

            if (!user.EmailConfirmed)
                return StatusCode((int)HttpStatusCode.Forbidden, "This email is not confirmed");

            var validateNewPasswordResult = await new PasswordValidator<ApplicationUser>().ValidateAsync(_userManager, user, newPassword);

            if (!validateNewPasswordResult.Succeeded)
                return BadRequest(validateNewPasswordResult.Errors.Select(x => x.Description));

            token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));
            var resetPasswordResult = await _userManager.ResetPasswordAsync(user, token, newPassword);

            if (!resetPasswordResult.Succeeded)
                return StatusCode((int)HttpStatusCode.InternalServerError, "An internal server error occurred or token expired");

            return Ok();
        }

        [HttpDelete]
        [Authorize]
        public async Task<ActionResult> Delete(string password)
        {
            var user = await _userManager.FindByIdAsync(_currentUserService.UserId);
            if (user is null)
                return Unauthorized();

            if (!user.HasPassword)
                return BadRequest("To delete an account, you need to set password up first");

            if (!await _userManager.CheckPasswordAsync(user, password))
                return BadRequest("Invalid password");

            await _mediator.Send(new DeleteAccountDataCommand());

            var deleteUserResult = await _userManager.DeleteAsync(user);
            var userId = await _userManager.GetUserIdAsync(user);

            if (!deleteUserResult.Succeeded)
                throw new InvalidOperationException($"Unexpected error occurred deleting user with ID '{userId}'.");

            _logger.LogInformation("User with ID '{UserId}' deleted themselves.", userId);

            return Ok();
        }

        [HttpPatch]
        [Authorize]
        public async Task<ActionResult> Update(string email, string currentPassword, string newPassword)
        {
            ApplicationUser user = await _userManager.FindByIdAsync(_currentUserService.UserId);
            if (user is null)
                return Unauthorized();

            // change or set password
            if (!String.IsNullOrEmpty(newPassword))
            {
                if (user.HasPassword && !(await _userManager.CheckPasswordAsync(user, currentPassword)))
                    return BadRequest("Current password is incorrect");

                var validateNewPasswordResult = await new PasswordValidator<ApplicationUser>().ValidateAsync(_userManager, user, newPassword);

                if (!validateNewPasswordResult.Succeeded)
                    return BadRequest(validateNewPasswordResult.Errors.Select(x => x.Description));

                if (user.HasPassword)
                    await _userManager.RemovePasswordAsync(user);

                var addPasswordResult = await _userManager.AddPasswordAsync(user, newPassword);

                if (addPasswordResult.Succeeded)
                    user.HasPassword = true;
            }


            if (user.Email != email)
            {
                user.Email = email;
                user.EmailConfirmed = false;

                var updateUserResult = await _userManager.UpdateAsync(user);

                if (!updateUserResult.Succeeded)
                    return BadRequest(updateUserResult.Errors.Select(x => x.Description));

                await SendConfirmEmailAsync(email);
            }

            return Ok();
        }

        private async Task<dynamic> CreateUser(string email, string password = "")
        {
            bool hasPassword = !String.IsNullOrEmpty(password);

            ApplicationUser user = new ()
            {
                Email = email,
                UserName = Guid.NewGuid().ToString(),
                HasPassword = hasPassword
            };

            if (!hasPassword)
            {
                // Account created with google or facebook, so doesn't need to confirm email.
                user.EmailConfirmed = true;
                await _userManager.CreateAsync(user);
                return user;
            }

            if (hasPassword)
                return await _userManager.CreateAsync(user, password);

            throw new Exception();
        }

        private async Task SendConfirmEmailAsync(string email)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(email);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = Url.Action(nameof(ConfirmEmail), "Accounts", new { token, email = user.Email }, Request.Scheme);

            string emailContent = new EmailContentCreatorService(
                callbackUrl,
                "I'm excited to have you get started. If you want to confirm your account.",
                "Confirm Email"
                ).CreateEmailContent();

            var message = new Message(new string[] { user.Email }, "[MultiStopwatch] Confirm your email", emailContent, null);
            await _emailSender.SendEmailAsync(message);
        }

        private async Task<JObject> GetFacebookAuthCheck(string authToken)
        {
            using HttpClient client = new();

            string url = "https://graph.facebook.com/me?access_token=" + authToken;
            using HttpResponseMessage res = await client.GetAsync(url);

            using HttpContent content = res.Content;

            string data = await content.ReadAsStringAsync();
            JObject dataObj = JObject.Parse(data);

            return dataObj;
        }
    }
}
