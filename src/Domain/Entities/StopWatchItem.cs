using Project.Domain.Common;

namespace Domain.Entities
{
    public class StopWatchItem : AuditableEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Time { get; set; }
        public int ProjectItemId { get; set; }
        public ProjectItem ProjectItem { get; set; }
    }
}
