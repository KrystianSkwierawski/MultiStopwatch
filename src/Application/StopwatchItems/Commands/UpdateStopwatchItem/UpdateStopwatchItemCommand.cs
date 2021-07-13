﻿using Domain.Entities;
using MediatR;
using Project.Application.Common.Exceptions;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.StopwatchItems.Commands.UpdateStopwatchItem
{
    public class UpdateStopwatchItemCommand : IRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Time { get; set; }
        public string Theme { get; set; }
        public string Status { get; set; }

        public class UpdateStopwatchItemCommandHandler : IRequestHandler<UpdateStopwatchItemCommand>
        {
            private readonly IContext _context;

            public UpdateStopwatchItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateStopwatchItemCommand request, CancellationToken cancellationToken)
            {
                StopwatchItem entity = await _context.StopWatchItems.FindAsync(request.Id);

                if (entity is null)
                {
                    throw new NotFoundException(nameof(StopwatchItem), request.Id);
                }

                entity.Title = request.Title;
                entity.Time = request.Time;
                entity.Theme = request.Theme;
                entity.Status = request.Status;

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }

}
