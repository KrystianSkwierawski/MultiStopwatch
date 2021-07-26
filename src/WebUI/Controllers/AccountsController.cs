using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Project.Application.Common.JwtFeatures;
using Project.Application.Common.Models;
using Project.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
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

        public AccountsController(UserManager<ApplicationUser> userManager, JwtHandler jwtHandler)
        {
            _userManager = userManager;
            _jwtHandler = jwtHandler;
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

            ApplicationUser user = new ApplicationUser
            {
                Email = payload.Email,
                UserName = payload.Email,
            };

            var result = await _userManager.CreateAsync(user);

            var claims = _jwtHandler.GetClamis(payload.Email, payload.JwtId);
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

            ApplicationUser user = new ApplicationUser
            {
                Email = email,
                UserName = email,
            };

            var result = await _userManager.CreateAsync(user);

            var claims = _jwtHandler.GetClamis(email, id);
            string token = _jwtHandler.GenerateToken(claims);

            return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token });
        }

        public async Task<JObject> GetFacebookAuthCheck(string authToken)
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
