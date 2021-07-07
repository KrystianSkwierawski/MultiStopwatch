using Project.Domain.Common;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class StopwatchItem : AuditableEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Time { get; set; } = "00:00:00";
        public int ProjectItemId { get; set; }
        public string Theme { get; set; }
        public bool IsDone { get; set; } = false;
        public IList<SplittedTime> SplittedTimes { get; set; } = new List<SplittedTime>();
    }
}
