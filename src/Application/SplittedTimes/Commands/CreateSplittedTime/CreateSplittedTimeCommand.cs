using AutoMapper;
using Domain.Entities;
using MediatR;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.SplittedTimes.Commands.CreateSplittedTime
{

    public class CreateSplittedTimeCommand : IRequest<SplittedTimeDto>
    {
        public int StopwatchItemId { get; set; }
        public string Time { get; set; }

        public class CreateSplittedTimeCommandHandler : IRequestHandler<CreateSplittedTimeCommand, SplittedTimeDto>
        {
            private readonly IContext _context;
            private readonly IMapper _mapper;

            public CreateSplittedTimeCommandHandler(IContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<SplittedTimeDto> Handle(CreateSplittedTimeCommand request, CancellationToken cancellationToken)
            {
                SplittedTime entity = new()
                {
                    StopwatchItemId = request.StopwatchItemId,
                    Time = request.Time
                };

                await _context.SplittedTimes.AddAsync(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<SplittedTimeDto>(entity);
            }
        }
    }

}
