using MediatR;
using Microsoft.AspNetCore.SignalR;
using Project.Application.ProjectItems.Commands.UpdateProjectItem;
using Project.Application.ProjectItems.Queries.GetProjectItem;
using Project.Application.StopwatchItems.Commands.UpdateStopwatchItem;
using Project.Application.StopwatchItems.Queries.GetStopwatchItemsWithPagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.WebUI.Hubs
{
    public class LocalChangesHub : Hub
    {
        readonly ISender _mediator;
        static Dictionary<string, List<StopwatchItemDto>> _localStopwatchesChanges = new Dictionary<string, List<StopwatchItemDto>>();
        static Dictionary<string, ProjectItemDto> _localProjectChanges = new Dictionary<string, ProjectItemDto>();

        public LocalChangesHub(ISender mediator)
        {
            _mediator = mediator;
        }

        public override async Task OnConnectedAsync()
        {
            _localStopwatchesChanges.Add(Context.ConnectionId, new List<StopwatchItemDto>());
            _localProjectChanges.Add(Context.ConnectionId, null);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {          
            await SaveStopwatchesChangesInDb();
            await SaveProjectChangesInDb();

            CleanUnusingChanges();

            await base.OnDisconnectedAsync(exception);
        }

        public void CleanUnusingChanges()
        {
            _localProjectChanges.Remove(Context.ConnectionId);
            _localStopwatchesChanges.Remove(Context.ConnectionId);
        }

        public async Task SaveStopwatchesChangesInDb()
        {
            List<StopwatchItemDto> stopwatches = _localStopwatchesChanges[Context.ConnectionId];

            if (stopwatches == null)
                return;

            foreach (var stopwatch in stopwatches)
            {
                await _mediator.Send(new UpdateStopwatchItemCommand
                {
                    Id = stopwatch.Id,
                    Title = stopwatch.Title,
                    Time = stopwatch.Time
                });
            }
        }

        public async Task SaveProjectChangesInDb()
        {
            ProjectItemDto project = _localProjectChanges[Context.ConnectionId];

            if (project == null)
                return;

            await _mediator.Send(new UpdateProjectItemCommand
            {
                Id = project.Id,
                Title = project.Title,
                Time = project.Time
            });
        }

        public async Task SaveLocalStopwatchChanges(StopwatchItemDto stopwatchItemDto)
        {
            if (stopwatchItemDto == null)
                return;

            if (_localStopwatchesChanges[Context.ConnectionId].FirstOrDefault(x => x.Id == stopwatchItemDto.Id) == null)
            {
                _localStopwatchesChanges[Context.ConnectionId].Remove(stopwatchItemDto);
            }

            _localStopwatchesChanges[Context.ConnectionId].Add(stopwatchItemDto);
        }

        public async Task SaveLocalProjectChanges(ProjectItemDto projectItemDto)
        {
            if (projectItemDto == null)
                return;

            _localProjectChanges[Context.ConnectionId] = projectItemDto;
        }
    }
}
