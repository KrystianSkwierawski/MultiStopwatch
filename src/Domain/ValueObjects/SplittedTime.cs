using Project.Domain.Common;
using System.Collections.Generic;

namespace Domain.ValueObjects
{
    public class SplittedTime : ValueObject
    {
        public string Time { get; set; }

        public SplittedTime()
        {

        }

        public SplittedTime(string time)
        {
            Time = Time;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Time;
        }
    }
}
