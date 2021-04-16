using Domain.Entities;
using MediatR;
using Project.Application.Common.Exceptions;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.SplittedTimes.Commands.DeleteSplittedTime
{
    public class DeleteSplittedTimeCommand : IRequest
    {
        public int Id { get; set; }

        public class DeleteSplittedTimeCommandHandler : IRequestHandler<DeleteSplittedTimeCommand>
        {
            private readonly IContext _context;

            public DeleteSplittedTimeCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteSplittedTimeCommand request, CancellationToken cancellationToken)
            {
                SplittedTime entity = await _context.SplittedTimes.FindAsync(request.Id);

                if (entity is null)
                {
                    throw new NotFoundException(nameof(SplittedTime), request.Id);
                }

                _context.SplittedTimes.Remove(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
