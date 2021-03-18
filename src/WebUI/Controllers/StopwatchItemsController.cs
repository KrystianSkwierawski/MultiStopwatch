using Microsoft.AspNetCore.Mvc;
using Project.Application.Common.Models;
using Project.Application.StopwatchItems.Commands.CreateStopwatchItem;
using Project.Application.StopwatchItems.Commands.DeleteStopwatchItem;
using Project.Application.StopwatchItems.Commands.UpdateStopwatchItem;
using Project.Application.StopwatchItems.Queries.GetStopwatchItemsWithPagination;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class StopwatchItemsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<StopwatchItemDto>>> GetWithPagination([FromQuery] GetStopwatchItemsWithPaginationQuery command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateStopwatchItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateStopwatchItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteStopwatchItemCommand { Id = id });

            return NoContent();
        }
    }
}
