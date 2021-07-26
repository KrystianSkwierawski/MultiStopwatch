﻿using Domain.Entities;
using MediatR;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.StopwatchItems.Commands.CreateStopwatchItem
{
    public class CreateStopwatchItemCommand : IRequest<int>
    {
        public int ProjectItemId { get; set; }
        public string Title { get; set; }
        public string Theme { get; set; }

        public class CreateStopwatchItemCommandHandler : IRequestHandler<CreateStopwatchItemCommand, int>
        {
            private readonly IContext _context;

            public CreateStopwatchItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateStopwatchItemCommand request, CancellationToken cancellationToken)
            {
                StopwatchItem entity = new()
                {
                    ProjectItemId = request.ProjectItemId,
                    Title = request.Title,
                    Theme = request.Theme,
                };

                await _context.StopWatchItems.AddAsync(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return entity.Id;
            }
        }
    }

}
