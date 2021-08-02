using Google.Apis.Auth;
using IdentityServer4.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.V4.Pages.Account.Manage.Internal;
using Microsoft.AspNetCore.Mvc;
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

        public AccountsController(UserManager<ApplicationUser> userManager, JwtHandler jwtHandler, ICurrentUserService currentUserService, ILogger<DeletePersonalDataModel> logger, ISender mediator)
        {
            _userManager = userManager;
            _jwtHandler = jwtHandler;
            _currentUserService = currentUserService;
            _logger = logger;
            _mediator = mediator;
        }


        [HttpGet("GetUser")]
        public async Task<ActionResult<ApplicationUser>> GetUser()
        {
            return await _userManager.FindByIdAsync(_currentUserService.UserId);
        }


        [HttpPost("Register")]
        public async Task<ActionResult<RegistrationResponse>> Register(UserForRegistration userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest();

            ApplicationUser user = new ApplicationUser
            {
                Email = userForRegistration.Email,
                UserName = userForRegistration.Email,
                HasPassword = true
            };

            var result = await _userManager.CreateAsync(user, userForRegistration.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new RegistrationResponse { Errors = errors });
            }

            return Ok();
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AuthResponse>> Login(UserForAuthentication userForAuthentication)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(userForAuthentication.Email);

            if (user is null)
                return BadRequest(new AuthResponse { ErrorMessage = "There is no user with this e-mail" });

            if (!await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return BadRequest(new AuthResponse { ErrorMessage = "Invalid password" });

            var claims = _jwtHandler.GetClamis(user.Email, user.Id);
            string token = _jwtHandler.GenerateToken(claims);

            return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token });
        }

        [HttpPost("GoogleAuthenticate")]
        public async Task<ActionResult<AuthResponse>> GoogleAuthenticate(string idToken)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();

            settings.Audience = new List<string>() { "1077472699821-km2iel871mij429reoh6uev8dl6k4v3a.apps.googleusercontent.com" };

            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(idToken, settings).Result;

            ApplicationUser user = await _userManager.FindByEmailAsync(payload.Email);

            if (user is null)
            {
                user = new ApplicationUser
                {
                    Email = payload.Email,
                    UserName = payload.Email,
                    HasPassword = false
                };

                var result = await _userManager.CreateAsync(user);
            }

            var claims = _jwtHandler.GetClamis(payload.Email, user.Id);
            string token = _jwtHandler.GenerateToken(claims);

            return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token });
        }

        [HttpPost("FacebookAuthenticate")]
        public async Task<ActionResult<AuthResponse>> FacebookAuthenticate(string email, string name, string id, string authToken)
        {
            var facebookAuthCheck = await GetFacebookAuthCheck(authToken);

            if (facebookAuthCheck is null)
                return StatusCode(424);

            string facebookAuthCheckName = facebookAuthCheck["name"]?.Value<string>();
            string facebookAuthCheckId = facebookAuthCheck["id"]?.Value<string>();

            if (facebookAuthCheckName != name || facebookAuthCheckId != id)
            {
                string facebookAuthErrorMessage = facebookAuthCheck["error"]["message"].Value<string>();
                return BadRequest(new AuthResponse { ErrorMessage = facebookAuthErrorMessage });
            }

            ApplicationUser user = await _userManager.FindByEmailAsync(email);

            if (user is null)
            {
                user = new ApplicationUser
                {
                    Email = email,
                    UserName = email,
                    HasPassword = false
                };

                var result = await _userManager.CreateAsync(user);
            }

            var claims = _jwtHandler.GetClamis(email, user.Id);
            string token = _jwtHandler.GenerateToken(claims);

            return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token });
        }

        [HttpPost("DeleteAccount")]
        public async Task<ActionResult<AuthResponse>> DeleteAccount(string password)
        {
            var user = await _userManager.FindByIdAsync(_currentUserService.UserId);
            if (user is null)
                return BadRequest(new AuthResponse { ErrorMessage = "There is no user with this e-mail" });

            if (!user.HasPassword)
                return BadRequest(new AuthResponse { ErrorMessage = "To delete an account, you need to set password up first" });

            if (!await _userManager.CheckPasswordAsync(user, password))
                return BadRequest(new AuthResponse { ErrorMessage = "Invalid password" });

            await _mediator.Send(new DeleteAccountDataCommand());

            var result = await _userManager.DeleteAsync(user);
            var userId = await _userManager.GetUserIdAsync(user);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException($"Unexpected error occurred deleting user with ID '{userId}'.");
            }

            _logger.LogInformation("User with ID '{UserId}' deleted themselves.", userId);

            return Ok(new AuthResponse { IsAuthSuccessful = true });
        }

        [HttpPatch("UpdateUser")]
        public async Task<ActionResult> UpdateUser(string email, string oldPassword, string newPassword)
        {
            ApplicationUser user = await _userManager.FindByIdAsync(_currentUserService.UserId);
            if (user is null)
                return StatusCode(401);

            // change or set password
            if (!String.IsNullOrEmpty(newPassword))
            {
                if (user.HasPassword && !(await _userManager.CheckPasswordAsync(user, oldPassword)))
                    return BadRequest(new string[] { "Old password is incorrect" });

                var validateNewPasswordResult = await new PasswordValidator<ApplicationUser>().ValidateAsync(_userManager, user, newPassword);

                if (!validateNewPasswordResult.Succeeded)
                    return BadRequest(validateNewPasswordResult.Errors.Select(x => x.Description));

                if (user.HasPassword)
                    await _userManager.RemovePasswordAsync(user);

                var addPasswordResult = await _userManager.AddPasswordAsync(user, newPassword);

                if (addPasswordResult.Succeeded)
                    user.HasPassword = true;
            }

            user.Email = email;

            var updateUserResult = await _userManager.UpdateAsync(user);

            if (!updateUserResult.Succeeded)
                return BadRequest(updateUserResult.Errors.Select(x => x.Description));

            return Ok();
        }

        private async Task<JObject> GetFacebookAuthCheck(string authToken)
        {
            using HttpClient client = new HttpClient();

            string url = "https://graph.facebook.com/me?access_token=" + authToken;
            using HttpResponseMessage res = await client.GetAsync(url);

            using HttpContent content = res.Content;

            string data = await content.ReadAsStringAsync();
            JObject dataObj = JObject.Parse(data);

            return dataObj;
        }
    }
}
