using Domain.Entities;
using Project.Application.Common.Mappings;
using Project.Application.GetProjectItems.Queries.GetProjectItems;

namespace Project.Application.StopwatchItems.Queries.GetStopwatchItems
{
    public class StopwatchItemDto : IMapFrom<StopwatchItem>
    {
        public string Title { get; set; }
        public string Time { get; set; }
        public int ProjectItemId { get; set; }
        public ProjectItemDto ProjectItem { get; set; }

    }
}
