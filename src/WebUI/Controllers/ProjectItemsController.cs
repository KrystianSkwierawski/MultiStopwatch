using Microsoft.AspNetCore.Mvc;
using Project.Application.GetProjectItems.Queries.GetProjectItems;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class ProjectItemsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<ProjectItemDto>>> Get()
        {
            return await Mediator.Send(new GetProjectItemsQuery());
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateProjectItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}
