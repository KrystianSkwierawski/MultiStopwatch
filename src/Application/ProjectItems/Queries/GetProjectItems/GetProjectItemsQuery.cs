using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.ProjectItems.Queries.GetProjectItems
{
    public class GetProjectItemsQuery : IRequest<ProjectsVm>
    {

        public class GetProjectItemsQueryHandler : IRequestHandler<GetProjectItemsQuery, ProjectsVm>
        {
            private readonly IContext _context;
            private readonly IMapper _mapper;

            public GetProjectItemsQueryHandler(IContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ProjectsVm> Handle(GetProjectItemsQuery request, CancellationToken cancellationToken)
            {
                return new ProjectsVm
                {
                    Projects = await _context.ProjectItems
                    .ProjectTo<ProjectItemDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken)
                };
            }
        }
    }
}
