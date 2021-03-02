using Microsoft.AspNetCore.Mvc;
using Project.Application.StopwatchItems.Commands;
using Project.Application.StopwatchItems.Queries.GetStopwatchItems;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class StopwatchItemsController : ApiControllerBase
    {
        [HttpGet("{projectId}")]
        public async Task<ActionResult<List<StopwatchItemDto>>> Get(int projectId)
        {
            return await Mediator.Send(new GetStopwatchItemsQuery { ProjectId = projectId });
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateStopwatchItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}
