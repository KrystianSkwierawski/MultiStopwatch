using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class CookiesTokenController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<string>> Get()
        {
            var token = HttpContext.Request.Cookies["token"];

            if (token is null)
                return NotFound();

            return Ok(token);
        }

        [Authorize]
        [HttpDelete]
        public async Task<ActionResult<string>> Delete()
        {
            Response.Cookies.Delete("token");

            return Ok();
        }
    }
}
