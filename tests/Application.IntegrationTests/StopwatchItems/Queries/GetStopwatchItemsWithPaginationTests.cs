using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Models;
using Project.Application.StopwatchItems.Queries.GetStopwatchItemsWithPagination;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.StopwatchItems.Queries
{
    using static Testing;

    public class GetStopwatchItemsWithPaginationTests : TestBase
    {
        [Test]
        public async Task ShouldReturnStopwatchItemsWithPagination()
        {
            //Arrange
            ProjectItem projectItem = new ProjectItem
            {
                Title = "Project"
            };
            await AddAsync(projectItem);


            StopwatchItem stopwatchItem = new StopwatchItem
            {
                ProjectItemId = projectItem.Id,
                Title = "Stopwatch"
            };
            await AddAsync(stopwatchItem);

            var query = new GetStopwatchItemsWithPaginationQuery
            {
                ProjectId = projectItem.Id,
                PageNumber = 1,
                PageSize = 50
            };

            //Act
            PaginatedList<StopwatchItemDto> result = await SendAsync(query);

            //Assert
            result.Should().NotBeNull();
            result.Items.Should().HaveCount(1);
            result.Items.First().Title.Should().Be(stopwatchItem.Title);
        }
    }
}
