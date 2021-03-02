using Microsoft.AspNetCore.Mvc;
using Project.Application.FavoriteProjectItems.Commands.LikeOrDislikeProjectItem;
using Project.Application.FavoriteProjectItems.Queries.GetFavoriteProjectsItems;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Project.WebUI.Controllers
{
    public class FavoriteProjectItemsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<FavoriteProjectItemDto>>> Get()
        {
            return await Mediator.Send(new GetFavoriteProjectsItemsQuery());
        }

        [HttpPatch]
        public async Task<ActionResult> LikeOrDislike(LikeOrDislikeProjectItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}
