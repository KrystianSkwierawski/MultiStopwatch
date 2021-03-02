using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.StopwatchItems.Queries.GetStopwatchItems
{
    public class GetStopwatchItemsQuery : IRequest<List<StopwatchItemDto>>
    {
        public int ProjectId { get; set; }

        public class GetStopwatchItemsQueryHandler : IRequestHandler<GetStopwatchItemsQuery, List<StopwatchItemDto>>
        {
            private readonly IContext _context;
            private readonly IMapper _mapper;

            public GetStopwatchItemsQueryHandler(IContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<StopwatchItemDto>> Handle(GetStopwatchItemsQuery request, CancellationToken cancellationToken)
            {
                return await _context.StopWatchItems
                    .Where(x => x.ProjectItemId == request.ProjectId)
                    .OrderByDescending(x => x.Id)
                    .ProjectTo<StopwatchItemDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
            }
        }
    }

}
