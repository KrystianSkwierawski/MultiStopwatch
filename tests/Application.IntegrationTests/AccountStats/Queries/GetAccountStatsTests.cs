using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.AccountsStats.Queries.GetAccountStats;
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
            ProjectItem projectItem = new()
            {
                Title = "project",
                Theme = "violet",
                Time = "10:10:10"
            };
            await AddAsync(projectItem);

            await AddAsync(new StopwatchItem
            {
                ProjectItemId = projectItem.Id,
                Title = "stopwatch",
            });

            var query = new GetAccountStatsQuery();

            //Act
            var result = await SendAsync(query);

            //Assert
            result.TotalNumberOfProjects.Should().Be(1);
            result.TotalNumberOfStopwatches.Should().Be(1);
            result.TotalTimeInSeconds.Should().Be(36610);
        }
    }
}
