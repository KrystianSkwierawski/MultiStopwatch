using Microsoft.AspNetCore.Mvc;
using Project.Application.SplittedTimes.Commands.CreateSplittedTime;
using Project.Application.StopwatchItems.Queries.GetStopwatchItemsWithPagination;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class SplittedtimesController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<SplittedTimeDto>> Create(CreateSplittedTimeCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
