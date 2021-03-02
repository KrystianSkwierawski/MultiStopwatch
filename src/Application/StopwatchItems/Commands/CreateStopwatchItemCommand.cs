using Domain.Entities;
using MediatR;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.StopwatchItems.Commands
{
    public class CreateStopwatchItemCommand : IRequest
    {
        public string Title { get; set; }
        public int ProjectId { get; set; }

        public class CreateStopwatchItemCommandHandler : IRequestHandler<CreateStopwatchItemCommand>
        {
            private readonly IContext _context;

            public CreateStopwatchItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(CreateStopwatchItemCommand request, CancellationToken cancellationToken)
            {
                StopwatchItem entity = new StopwatchItem
                {
                    Title = request.Title,
                    ProjectItemId = request.ProjectId,
                    Time = "00:00"
                };

                await _context.StopWatchItems.AddAsync(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }

}
