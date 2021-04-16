using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Models;
using Project.Application.ProjectItems.Queries.GetProjectItemsWithPagination;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.ProjectItems.Queries
{
    using static Testing;
    public class GetProjectItemsWithPaginationTests : TestBase
    {
        [Test]
        public async Task ShouldReturnProjectItemsWithPagination()
        {
            //Arrange

            await AddRangeAsync(new List<ProjectItem> {
                new ProjectItem
                {
                    Title = "stopwatch",
                },
                new ProjectItem
                {
                    Title = "stopwatch",
                },
                new ProjectItem
                {
                    Title = "stopwatch",
                },
                new ProjectItem
                {
                    Title = "stopwatch",
                }
            });

            GetProjectItemsWithPaginationQuery query = new()
            {
                PageNumber = 1,
                PageSize = 50
            };

            //Act
            PaginatedList<ProjectItemDto> result = await SendAsync(query);

            //Assert
            result.Should().NotBeNull();
            result.Items.Should().HaveCount(4);

            result.PageIndex.Should().Be(query.PageNumber);
            result.TotalCount.Should().Be(result.Items.Count());
            result.PageSize.Should().Be(query.PageSize);

            int totalPages = (int)System.Math.Ceiling(result.TotalCount / (double)result.PageSize);
            result.TotalPages.Should().Be(totalPages);
        }
    }
}
