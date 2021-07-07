using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.ProjectItems.Commands.CreateProjectItem
{
    public class CreateProjectItemCommand : IRequest<int>
    {
        public string Title { get; set; }
        public string Theme { get; set; }

        public class CreateProjectItemCommandHandler : IRequestHandler<CreateProjectItemCommand, int>
        {
            private readonly IContext _context;

            public CreateProjectItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateProjectItemCommand request, CancellationToken cancellationToken)
            {
                ProjectItem entity = new()
                {
                    Title = request.Title,
                    Theme = request.Theme,
                    IsFavorite = false,
                };

                await _context.ProjectItems.AddAsync(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return entity.Id;
            }
        }
    }
}
