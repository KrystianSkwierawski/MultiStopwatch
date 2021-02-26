using Microsoft.AspNetCore.Mvc;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.ProjectItems.Commands.LikeOrDislikeProjectItem;
using Project.Application.ProjectItems.Queries.GetProjectItems;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class ProjectItemController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<ProjectsVm>> Get()
        {
            return await Mediator.Send(new GetProjectItemsQuery());
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateProjectItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPatch]
        public async Task<ActionResult> LikeOrDislike(LikeOrDislikeProjectItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}
