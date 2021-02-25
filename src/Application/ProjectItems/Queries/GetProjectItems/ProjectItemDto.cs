using Domain.Entities;
using Project.Application.Common.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Application.ProjectItems.Queries.GetProjectItems
{
    public class ProjectItemDto : IMapFrom<ProjectItem>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsFavorite { get; set; }
        public string Time { get; set; }
    }
}
