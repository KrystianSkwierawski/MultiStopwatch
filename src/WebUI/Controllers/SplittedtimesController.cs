using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Application.SplittedTimes.Commands.CreateSplittedTime;
using Project.Application.SplittedTimes.Commands.DeleteSplittedTime;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    [Authorize]
    public class SplittedtimesController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<SplittedTimeDto>> Create(CreateSplittedTimeCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteSplittedTimeCommand{ Id = id});

            return NoContent();
        }
    }
}
