using Microsoft.AspNetCore.Mvc;
using Project.Application.FavoriteProjectItems.Commands.LikeOrDislikeProjectItem;
using Project.Application.FavoriteProjectItems.Commands.UpdateOrderIndex;
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

        [HttpPatch("{id}")]
        public async Task<ActionResult> LikeOrDislike(int id)
        {
            await Mediator.Send(new LikeOrDislikeProjectItemCommand { Id = id });

            return NoContent();
        }

        [HttpPatch]
        public async Task<ActionResult> UpdateOrderIndex(UpdateOrderIndexProjectItemCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}
