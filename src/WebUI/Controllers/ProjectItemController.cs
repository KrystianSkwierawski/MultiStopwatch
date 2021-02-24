using Microsoft.AspNetCore.Mvc;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class ProjectItemController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateProjectItemCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
