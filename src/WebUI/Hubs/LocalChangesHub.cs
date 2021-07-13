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
            await SaveAllChangesInDb();
            await RemoveUnusingChanges();

            await base.OnDisconnectedAsync(exception);
        }

        public async Task RemoveUnusingChanges()
        {
            _localProjectChanges.Remove(Context.ConnectionId);

            _localStopwatchesChanges.Remove(Context.ConnectionId);
        }

        public async Task SaveAllChangesInDb()
        {
            await SaveStopwatchesChangesInDb();
            await SaveProjectChangesInDb();
        }

        public async Task SaveStopwatchesChangesInDb()
        {
            List<StopwatchItemDto> stopwatches = _localStopwatchesChanges[Context.ConnectionId];

            if (stopwatches is null)
                return;

            foreach (var stopwatch in stopwatches)
            {
                await _mediator.Send(new UpdateStopwatchItemCommand
                {
                    Id = stopwatch.Id,
                    Title = stopwatch.Title,
                    Time = stopwatch.Time,
                    Theme = stopwatch.Theme,
                    Status = stopwatch.Status
                });
            }
        }

        public async Task SaveProjectChangesInDb()
        {
            ProjectItemDto project = _localProjectChanges[Context.ConnectionId];

            if (project is null)
                return;

            await _mediator.Send(new UpdateProjectItemCommand
            {
                Id = project.Id,
                Title = project.Title,
                Time = project.Time,
                Theme = project.Theme
            });
        }

        public async Task SaveLocalStopwatchChanges(StopwatchItemDto stopwatchItemDto)
        {
            if (stopwatchItemDto is null)
                return;

            StopwatchItemDto entity = await GetStopwatchChanges(stopwatchItemDto);

            entity.Title = stopwatchItemDto.Title;
            entity.Theme = stopwatchItemDto.Theme;
            entity.Time = stopwatchItemDto.Time;
            entity.Status = stopwatchItemDto.Status;
        }

        public async Task DeleteLocalStopwatchChangesById(int stopwatchId)
        {
            StopwatchItemDto entity = _localStopwatchesChanges[Context.ConnectionId]
                .FirstOrDefault(x => x.Id == stopwatchId);

            if (entity is null)
                return;

            _localStopwatchesChanges[Context.ConnectionId].Remove(entity);
        }

        public async Task<StopwatchItemDto> GetStopwatchChanges(StopwatchItemDto stopwatchItemDto)
        {
            StopwatchItemDto entity = _localStopwatchesChanges[Context.ConnectionId].FirstOrDefault(x => x.Id == stopwatchItemDto.Id);

            if (entity is null)
            {
                _localStopwatchesChanges[Context.ConnectionId].Add(stopwatchItemDto);
                entity = _localStopwatchesChanges[Context.ConnectionId].FirstOrDefault(x => x.Id == stopwatchItemDto.Id);
            }

            return entity;
        }

        public async Task SaveLocalProjectChanges(ProjectItemDto projectItemDto)
        {
            if (projectItemDto is null)
                return;

            _localProjectChanges[Context.ConnectionId] = projectItemDto;
        }
    }
}
