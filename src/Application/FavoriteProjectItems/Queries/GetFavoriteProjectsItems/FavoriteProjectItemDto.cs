using Domain.Entities;
using Project.Application.Common.Mappings;

namespace Project.Application.FavoriteProjectItems.Queries.GetFavoriteProjectsItems
{
    public class FavoriteProjectItemDto : IMapFrom<ProjectItem>
    {
        public int Id { get; set; }
        public string _title;
        public string Title
        {
            get => _title;
            set
            {
                if(value.Length > 15)
                {
                    _title = value.Substring(0, 12) + "...";
                }
            }
        }

        public string Time { get; set; }
        public int OrderIndex { get; set; }

        public string Theme { get; set; }
    }
}
