using Microsoft.AspNetCore.Mvc;
using Project.Application.Common.Models;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.ProjectItems.Commands.DeleteProjectItem;
using Project.Application.ProjectItems.Commands.UpdateProjectItem;
using Project.Application.ProjectItems.Queries.GetProjectItemsWithPagination;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class ProjectItemsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<ProjectItemDto>>> GetWithPagination([FromQuery] GetProjectItemsWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateProjectItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateProjectItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteProjectItemCommand { Id = id });

            return NoContent();
        }
    }
}
