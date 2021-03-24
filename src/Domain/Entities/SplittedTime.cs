using Project.Domain.Common;

namespace Domain.Entities
{
    public class SplittedTime : AuditableEntity
    {
        public int Id { get; set; }
        public int StopwatchItemId { get; set; }
        public string Time { get; set; }
    }
}
