using Project.Domain.Common;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class ProjectItem : AuditableEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsFavorite { get; set; } = false;
        public string Time { get; set; } = "00:00:00";
        public string Theme { get; set; }
        public int OrderIndex { get; set; }
        public string Status { get; set; } = "doing";
        public IList<StopwatchItem> StopwatchItems { get; private set; } = new List<StopwatchItem>();
    }
}
