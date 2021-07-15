using Domain.Entities;
using MediatR;
using Project.Application.Common.Exceptions;
using Project.Application.Common.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.ProjectItems.Commands.UpdateProjectItem
{
    public class UpdateProjectItemCommand : IRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Time { get; set; }
        public string Theme { get; set; }
        public string Status { get; set; }

        public class UpdateProjectItemCommandHandler : IRequestHandler<UpdateProjectItemCommand>
        {
            private readonly IContext _context;

            public UpdateProjectItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateProjectItemCommand request, CancellationToken cancellationToken)
            {
                ProjectItem entity = await _context.ProjectItems.FindAsync(request.Id);

                if (entity is null)
                {
                    throw new NotFoundException(nameof(ProjectItem), request.Id);
                }

                entity.Title = request.Title;
                entity.Time = request.Time;
                entity.Theme = request.Theme;

                if (entity.Status != request.Status)
                {
                    entity.Status = request.Status;

                    _context.StopWatchItems.Where(x => x.ProjectItemId == request.Id)
                        .ToList()
                        .ForEach(c => c.Status = request.Status);
                }

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }          
        }
    }

}
