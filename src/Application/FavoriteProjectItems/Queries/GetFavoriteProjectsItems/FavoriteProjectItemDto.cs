using Domain.Entities;
using Project.Application.Common.Mappings;

namespace Project.Application.FavoriteProjectItems.Queries.GetFavoriteProjectsItems
{
    public class FavoriteProjectItemDto : IMapFrom<ProjectItem>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int OrderIndex { get; set; }

        public string Theme { get; set; }
    }
}
