using AutoMapper;
using Domain.Entities;
using MediatR;
using Project.Application.Common.Exceptions;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.ProjectItems.Queries.GetProjectItem
{

    public class GetProjectItemQuery : IRequest<ProjectItemDto>
    {
        public int Id { get; set; }

        public class GetProjectItemQueryHandler : IRequestHandler<GetProjectItemQuery, ProjectItemDto>
        {
            private readonly IContext _context;
            private readonly IMapper _mapper;

            public GetProjectItemQueryHandler(IContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ProjectItemDto> Handle(GetProjectItemQuery request, CancellationToken cancellationToken)
            {
                ProjectItem entity = await _context.ProjectItems.FindAsync(request.Id);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(ProjectItem), request.Id);
                }

                return _mapper.Map<ProjectItemDto>(entity);
            }
        }
    }

}
