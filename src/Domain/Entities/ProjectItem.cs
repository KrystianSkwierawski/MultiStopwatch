using Project.Domain.Common;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class ProjectItem : AuditableEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsFavorite { get; set; }
        public IList<StopWatchItem> StopWatchItems { get; set; } = new List<StopWatchItem>();    }
}
