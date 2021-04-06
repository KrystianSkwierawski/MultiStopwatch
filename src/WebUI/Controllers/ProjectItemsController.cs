using Microsoft.AspNetCore.Mvc;
using Project.Application.Common.Models;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.ProjectItems.Commands.DeleteProjectItem;
using Project.Application.ProjectItems.Commands.UpdateProjectItem;
using Project.Application.ProjectItems.Queries.GetProjectItem;
using Project.Application.ProjectItems.Queries.GetProjectItemsWithPagination;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class ProjectItemsController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<Application.ProjectItems.Queries.GetProjectItem.ProjectItemDto> Get(int id)
        {
            return await Mediator.Send(new GetProjectItemQuery { Id = id });
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedList<Application.ProjectItems.Queries.GetProjectItemsWithPagination.ProjectItemDto>>> GetWithPagination([FromQuery] GetProjectItemsWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateProjectItemCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateProjectItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteProjectItemCommand { Id = id });

            return NoContent();
        }
    }
}
