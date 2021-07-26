using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Models;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.StopwatchItems.Queries.GetStopwatchItemsWithPagination;
using System.Collections.Generic;
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
            var projectId = await SendAsync(new CreateProjectItemCommand
            {
                Title = "project",
                Theme = "violet"
            });

            await AddRangeAsync(new List<StopwatchItem> {
                new StopwatchItem
                {
                    ProjectItemId = projectId,
                    Title = "stopwatch",
                },
                new StopwatchItem
                {
                    ProjectItemId = projectId,
                    Title = "stopwatch",
                },
                new StopwatchItem
                {
                    ProjectItemId = projectId,
                    Title = "stopwatch",
                }
            });

            GetStopwatchItemsWithPaginationQuery query = new()
            {
                ProjectId = projectId,
                PageNumber = 1,
                PageSize = 50
            };

            //Act
            PaginatedList<StopwatchItemDto> result = await SendAsync(query);

            //Assert
            result.Should().NotBeNull();
            result.Items.Should().HaveCount(3);

            result.PageIndex.Should().Be(query.PageNumber);
            result.TotalCount.Should().Be(result.Items.Count());
            result.PageSize.Should().Be(query.PageSize);

            int totalPages = (int)System.Math.Ceiling(result.TotalCount / (double)result.PageSize);
            result.TotalPages.Should().Be(totalPages);
        }
    }
}
