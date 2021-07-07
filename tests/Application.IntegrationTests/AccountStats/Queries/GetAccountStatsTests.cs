using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.AccountsStats.Queries.GetAccountStats;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.FavoriteProjectItems.Queries
{
    using static Testing;

    public class GetAccountStatsTests : TestBase
    {
        [Test]
        public async Task ShouldReturnAccountStats()
        {
            ////Arrange
            //await SetUp();

            //var query = new GetAccountStatsQuery();

            ////Act
            //var result = await SendAsync(query);

            ////Assert
            //result.TotalTimeInSeconds.Should().Be(36620);

            //result.TotalTimeInSecondsFinished.Should().Be(36610);

            //result.TotalTimeInSecondsNotFinished.Should().Be(10);

            //result.TotalNumberOfProjects.Should().Be(2);
            //result.TotalNumberOfFinishedProjects.Should().Be(1);
            //result.TotalNumberOfNotFinishedProjects.Should().Be(1);

            //result.TotalNumberOfStopwatches.Should().Be(2);
            //result.TotalNumberOfFinishedStopwatches.Should().Be(1);
            //result.TotalNumberOfNotFinishedStopwatches.Should().Be(1);
        }

        public async Task SetUp()
        {
            await AddAsync(new ProjectItem
            {
                Title = "project",
                Theme = "violet",
                Time = "00:00:10",
                IsDone = false
            });

            ProjectItem projectItem = new()
            {
                Title = "project",
                Theme = "violet",
                Time = "10:10:10",
                IsDone = true
            };
            await AddAsync(projectItem);

            await AddRangeAsync(new List<StopwatchItem> {
                new StopwatchItem
                {
                    ProjectItemId = projectItem.Id,
                    Title = "stopwatch",
                    IsDone = false
                },
                new StopwatchItem
                {
                    ProjectItemId = projectItem.Id,
                    Title = "stopwatch",
                    IsDone = true
                }
            });
        }

    }
}
