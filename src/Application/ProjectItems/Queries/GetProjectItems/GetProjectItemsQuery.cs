using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.GetProjectItems.Queries.GetProjectItems
{
    public class GetProjectItemsQuery : IRequest<List<ProjectItemDto>>
    {
        public class GetProjectItemsQueryHandler : IRequestHandler<GetProjectItemsQuery, List<ProjectItemDto>>
        {
            private readonly IContext _context;
            private readonly IMapper _mapper;

            public GetProjectItemsQueryHandler(IContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<ProjectItemDto>> Handle(GetProjectItemsQuery request, CancellationToken cancellationToken)
            {
                return await _context.ProjectItems
                    .OrderByDescending(x => x.Id)
                    .ProjectTo<ProjectItemDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}

