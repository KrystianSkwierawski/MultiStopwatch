using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.FavoriteProjectItems.Queries.GetFavoriteProjectsItems
{
    public class GetFavoriteProjectsItemsQuery : IRequest<List<FavoriteProjectItemDto>>
    {
        public class GetFavoriteProjectsItemsQueryHandler : IRequestHandler<GetFavoriteProjectsItemsQuery, List<FavoriteProjectItemDto>>
        {
            private readonly IContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;

            public GetFavoriteProjectsItemsQueryHandler(IContext context, IMapper mapper, ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<List<FavoriteProjectItemDto>> Handle(GetFavoriteProjectsItemsQuery request, CancellationToken cancellationToken)
            {
                return await _context.ProjectItems
                 .Where(x => x.CreatedBy == _currentUserService.UserId && x.IsFavorite == true)
                 .OrderBy(x => x.OrderIndex)
                 .ProjectTo<FavoriteProjectItemDto>(_mapper.ConfigurationProvider)
                 .ToListAsync(cancellationToken);
            }
        }
    }
}
