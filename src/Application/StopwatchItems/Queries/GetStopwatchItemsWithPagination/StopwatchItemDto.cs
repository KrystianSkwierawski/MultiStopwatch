using AutoMapper;
using Domain.Entities;
using Project.Application.Common.Mappings;
using Project.Application.SplittedTimes.Commands.CreateSplittedTime;
using System.Collections.Generic;

namespace Project.Application.StopwatchItems.Queries.GetStopwatchItemsWithPagination
{
    public class StopwatchItemDto : IMapFrom<StopwatchItem>
    {
        public StopwatchItemDto()
        {
            SplittedTimes = new List<SplittedTimeDto>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Time { get; set; }
        public int ProjectItemId { get; set; }
        public string Theme { get; set; }
        public bool IsStarted { get; set; }
        public IList<SplittedTimeDto> SplittedTimes { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<StopwatchItem, StopwatchItemDto>()
                .ForMember(x => x.IsStarted, opt => opt.Ignore());
        }
    }
}
