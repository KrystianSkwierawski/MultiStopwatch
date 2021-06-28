using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project.Application.Common.JwtFeatures;
using Project.Application.Common.Models;
using Project.Domain.Entities;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager; 
        private readonly IMapper _mapper;
        private readonly JwtHandler _jwtHandler;

        public AccountsController(UserManager<ApplicationUser> userManager, IMapper mapper, JwtHandler jwtHandler) 
        {
            _userManager = userManager;
            _mapper = mapper;
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
                UserName = userForRegistration.Email
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
            var user = await _userManager.FindByEmailAsync(userForAuthentication.Email);

            if(user is null)
                return BadRequest(new AuthResponse { ErrorMessage = "There is no user with this e-mail" });

            if (!await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return BadRequest(new AuthResponse { ErrorMessage = "Invalid password" });

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token });
        }
    }
}
