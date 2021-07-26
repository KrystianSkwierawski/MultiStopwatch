using Domain.Entities;
using Domain.Enums;
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
            //Arrange
            await SetUp();

            var query = new GetAccountStatsQuery();

            //Act
            var result = await SendAsync(query);

            //Assert
            result.TotalTimeInSeconds.Should().Be(36620);

            result.TotalTimeInSecondsFinished.Should().Be(36610);

            result.TotalTimeInSecondsNotFinished.Should().Be(10);

            result.NumberOfProjects.Should().Be(2);
            result.NumberOfFinishedProjects.Should().Be(1);
            result.NumberOfNotFinishedProjects.Should().Be(1);

            result.NumberOfStopwatches.Should().Be(3);
            result.NumberOfFinishedStopwatches.Should().Be(2);
            result.NumberOfNotFinishedStopwatches.Should().Be(1);

            result.NumberOfFavoriteProjects.Should().Be(1);
        }

        public async Task SetUp()
        {
            await AddAsync(new ProjectItem
            {
                Title = "project",
                Theme = "violet",
                Time = "00:00:10",
                Status = Status.Doing,
                IsFavorite = true
            });

            ProjectItem projectItem = new()
            {
                Title = "project",
                Theme = "violet",
                Time = "10:10:10",
                Status = Status.Done
            };
            await AddAsync(projectItem);

            await AddRangeAsync(new List<StopwatchItem> {
                new StopwatchItem
                {
                    ProjectItemId = projectItem.Id,
                    Title = "stopwatch",
                    Status = Status.Done
                },
                new StopwatchItem
                {
                    ProjectItemId = projectItem.Id,
                    Title = "stopwatch",
                     Status = Status.Done
                },
                  new StopwatchItem
                {
                    ProjectItemId = projectItem.Id,
                    Title = "stopwatch",
                }
            });
        }

    }
}
