using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Application.AccountData.Queries.GetAccountStats;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    [Authorize]
    public class AccountStatsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<AccountStatsDto> Get()
        {
            return await Mediator.Send(new GetAccountStatsQuery());
        }
    }
}
