using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Project.Application.Common.Interfaces;
using Project.Application.Common.Mappings;
using Project.Application.Common.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.ProjectItems.Queries.GetProjectItemsWithPagination
{
    public class GetProjectItemsWithPaginationQuery : IRequest<PaginatedList<ProjectItemDto>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetProjectItemsWithPaginationQueryHandler : IRequestHandler<GetProjectItemsWithPaginationQuery, PaginatedList<ProjectItemDto>>
        {
            private readonly IContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;

            public GetProjectItemsWithPaginationQueryHandler(IContext context, IMapper mapper, ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<PaginatedList<ProjectItemDto>> Handle(GetProjectItemsWithPaginationQuery request, CancellationToken cancellationToken)
            {
                return await _context.ProjectItems
                    .Where(x => x.CreatedBy == _currentUserService.UserId)
                    .OrderByDescending(x => x.Id)
                    .ProjectTo<ProjectItemDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(request.PageNumber, request.PageSize);
            }
        }
    }
}

