using Domain.Entities;
using Project.Application.Common.Mappings;

namespace Project.Application.SplittedTimes.Commands.CreateSplittedTime
{
    public class SplittedTimeDto : IMapFrom<SplittedTime>
    {
        public int Id { get; set; }
        public string Time { get; set; }
    }
}
