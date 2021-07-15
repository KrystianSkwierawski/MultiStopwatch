using Domain.Entities;
using MediatR;
using Project.Application.Common.Exceptions;
using Project.Application.Common.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.ProjectItems.Commands.DeleteProjectItem
{

    public class DeleteProjectItemCommand : IRequest
    {
        public int Id { get; set; }
        public class DeleteProjectItemCommandHandler : IRequestHandler<DeleteProjectItemCommand>
        {
            private readonly IContext _context;

            public DeleteProjectItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteProjectItemCommand request, CancellationToken cancellationToken)
            {
                ProjectItem entity = await _context.ProjectItems.FindAsync(request.Id);

                if (entity is null)
                {
                    throw new NotFoundException(nameof(ProjectItem), request.Id);
                }

                IQueryable<StopwatchItem> nestedStopwatches = _context.StopWatchItems.Where(x => x.ProjectItemId == request.Id);
                _context.StopWatchItems.RemoveRange(nestedStopwatches);

                _context.ProjectItems.Remove(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }

}
