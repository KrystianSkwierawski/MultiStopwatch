using Domain.Entities;
using MediatR;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.StopwatchItems.Commands.CreateStopwatchItem
{
    public class CreateStopwatchItemCommand : IRequest
    {
        public int ProjectItemId { get; set; }
        public string Title { get; set; }
        public string Time { get; set; }
        public string Theme { get; set; }

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
                    ProjectItemId = request.ProjectItemId,
                    Title = request.Title,
                    Time = request.Time,
                    Theme = request.Theme                  
                };

                await _context.StopWatchItems.AddAsync(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }

}
