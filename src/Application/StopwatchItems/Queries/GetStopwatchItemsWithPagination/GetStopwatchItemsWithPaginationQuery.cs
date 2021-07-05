using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using Project.Application.Common.Mappings;
using Project.Application.Common.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.StopwatchItems.Queries.GetStopwatchItemsWithPagination
{
    public class GetStopwatchItemsWithPaginationQuery : IRequest<PaginatedList<StopwatchItemDto>>
    {
        public int ProjectId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetStopwatchItemsWithPaginationQueryHandler : IRequestHandler<GetStopwatchItemsWithPaginationQuery, PaginatedList<StopwatchItemDto>>
        {
            private readonly IContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;

            public GetStopwatchItemsWithPaginationQueryHandler(IContext context, IMapper mapper, ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<PaginatedList<StopwatchItemDto>> Handle(GetStopwatchItemsWithPaginationQuery request, CancellationToken cancellationToken)
            {
                return await _context.StopWatchItems
                    .AsNoTracking()
                    .Where(x => x.ProjectItemId == request.ProjectId && x.CreatedBy == _currentUserService.UserEmail)
                    .OrderByDescending(x => x.Id)
                    .ProjectTo<StopwatchItemDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(request.PageNumber, request.PageSize);
            }
        }
    }

}
