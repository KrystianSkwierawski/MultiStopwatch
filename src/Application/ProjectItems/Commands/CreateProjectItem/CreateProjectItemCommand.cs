using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.ProjectItems.Commands.CreateProjectItem
{
    public class CreateProjectItemCommand : IRequest
    {
        public string Title { get; set; }

        public class CreateProjectItemCommandHandler : IRequestHandler<CreateProjectItemCommand>
        {
            private readonly IContext _context;

            public CreateProjectItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(CreateProjectItemCommand request, CancellationToken cancellationToken)
            {
                ProjectItem entity = new ProjectItem
                {
                    Title = request.Title,
                    IsFavorite = false,
                    Time = "00:00:00",
                };

                await _context.ProjectItems.AddAsync(entity);

                await _context.SaveChangesAsync(cancellationToken);            

                return Unit.Value;
            }
        }
    }
}
