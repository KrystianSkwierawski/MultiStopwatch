using Domain.Entities;
using Domain.Enums;
using Project.Application.Common.Mappings;

namespace Project.Application.ProjectItems.Queries.GetProjectItemsWithPagination
{
    public class ProjectItemDto : IMapFrom<ProjectItem>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsFavorite { get; set; }
        public string Time { get; set; }
        public string Theme { get; set; }
<<<<<<< HEAD
        public string Status { get; set; }
=======
        public Status Status { get; set; }
>>>>>>> master

    }
}
