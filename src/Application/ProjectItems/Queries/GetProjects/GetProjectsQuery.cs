using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using Project.Application.ProjectItems.Queries.GetProjects;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.ProjectItems.Queries.GetProjectItems
{
    public class GetProjectsQuery : IRequest<ProjectsVm>
    {

        public class GetProjectsQueryHandler : IRequestHandler<GetProjectsQuery, ProjectsVm>
        {
            private readonly IContext _context;
            private readonly IMapper _mapper;

            public GetProjectsQueryHandler(IContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ProjectsVm> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
            {
                return new ProjectsVm
                {
                    Projects = _context.ProjectItems
                    .OrderByDescending(x => x.Id)
                    .ProjectTo<ProjectItemDto>(_mapper.ConfigurationProvider)
                    .ToList(),

                    FavoriteProjects = await _context.ProjectItems
                    .Where(x => x.IsFavorite == true)
                    .OrderByDescending(x => x.Id)
                    .ProjectTo<FavoriteProjectItemDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken)
                };
            }
        }


    }
}

