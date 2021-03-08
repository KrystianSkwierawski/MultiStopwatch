using Domain.Entities;
using MediatR;
using Project.Application.Common.Exceptions;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.StopwatchItems.Commands.DeleteStopwatchItem
{

    public class DeleteStopwatchItemCommand : IRequest
    {
        public int Id { get; set; }
        public class DeleteStopwatchItemCommandHandler : IRequestHandler<DeleteStopwatchItemCommand>
        {
            private readonly IContext _context;

            public DeleteStopwatchItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteStopwatchItemCommand request, CancellationToken cancellationToken)
            {
                StopwatchItem entity = await _context.StopWatchItems.FindAsync(request.Id);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(ProjectItem), request.Id);
                }

                _context.StopWatchItems.Remove(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }

}
