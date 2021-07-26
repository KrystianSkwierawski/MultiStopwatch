using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using Project.Application.FavoriteProjectItems.Queries.GetFavoriteProjectsItems;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.FavoriteProjectItems.Commands.UpdateOrderIndex
{

    public class UpdateOrderIndexProjectItemCommand : IRequest
    {
        public List<FavoriteProjectItemDto> CurrentProjects { get; set; }

        public class UpdateOrderIndexProjectItemCommandHandler : IRequestHandler<UpdateOrderIndexProjectItemCommand>
        {
            private readonly IContext _context;

            public UpdateOrderIndexProjectItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateOrderIndexProjectItemCommand request, CancellationToken cancellationToken)
            {
                List<ProjectItem> projectsFromDb = await _context.ProjectItems.ToListAsync();

                foreach (var projectFromDb in projectsFromDb)
                {
                    FavoriteProjectItemDto currentProject = request.CurrentProjects.FirstOrDefault(x => x.Id == projectFromDb.Id);
                    int currentIndex = request.CurrentProjects.IndexOf(currentProject);

                    projectFromDb.OrderIndex = currentIndex;
                }

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }

}
