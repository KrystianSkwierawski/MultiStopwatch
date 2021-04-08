using AutoMapper;
using Domain.Entities;
using MediatR;
using Project.Application.Common.Exceptions;
using Project.Application.Common.Interfaces;
using System.Linq;
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
            private readonly ICurrentUserService _currentUserService;

            public GetProjectItemQueryHandler(IContext context, IMapper mapper, ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<ProjectItemDto> Handle(GetProjectItemQuery request, CancellationToken cancellationToken)
            {
                ProjectItem entity = _context.ProjectItems
                    .FirstOrDefault(x => x.Id == request.Id && x.CreatedBy == _currentUserService.UserId);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(ProjectItem), request.Id);
                }

                return _mapper.Map<ProjectItemDto>(entity);
            }
        }
    }

}
