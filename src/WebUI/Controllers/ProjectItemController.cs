using Microsoft.AspNetCore.Mvc;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class ProjectItemController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Create(CreateProjectItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}
