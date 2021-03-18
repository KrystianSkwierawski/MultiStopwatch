using Domain.Entities;
using MediatR;
using Project.Application.Common.Exceptions;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.ProjectItems.Commands.UpdateProjectItem
{
    public class UpdateProjectItemCommand : IRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public class UpdateProjectItemCommandHandler : IRequestHandler<UpdateProjectItemCommand>
        {
            private readonly IContext _context;

            public UpdateProjectItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateProjectItemCommand request, CancellationToken cancellationToken)
            {
                ProjectItem entity = await _context.ProjectItems.FindAsync(request.Id);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(ProjectItem), request.Id);
                }

                entity.Title = request.Title;

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }

}
