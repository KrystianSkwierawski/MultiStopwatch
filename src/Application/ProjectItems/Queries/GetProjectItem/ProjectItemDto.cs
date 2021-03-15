using Domain.Entities;
using Project.Application.Common.Mappings;

namespace Project.Application.ProjectItems.Queries.GetProjectItem
{
    public class ProjectItemDto : IMapFrom<ProjectItem>
    {
        public string Title { get; set; }
        public string Time { get; set; }
    }
}
