using Project.Application.ProjectItems.Queries.GetProjects;
using System.Collections.Generic;

namespace Project.Application.ProjectItems.Queries.GetProjectItems
{
    public class ProjectsVm
    {
        public IList<ProjectItemDto> Projects { get; set; }
        public IList<FavoriteProjectItemDto> FavoriteProjects { get; set; }
    }
}
