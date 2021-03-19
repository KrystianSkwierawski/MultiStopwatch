using Domain.Entities;
using Project.Application.Common.Mappings;

namespace Project.Application.ProjectItems.Queries.GetProjectItem
{
    public class ProjectItemDto : IMapFrom<ProjectItem>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Time { get; set; }
        public string Theme { get; set; }
    }
}
