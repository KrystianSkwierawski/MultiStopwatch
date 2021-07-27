using Domain.Entities;
using Domain.Enums;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.AccountData.Commands.DeleteAccountData;
using Project.Application.ProjectItems.Queries.GetProjectItemsWithPagination;
using Project.Application.StopwatchItems.Queries.GetStopwatchItemsWithPagination;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.AccountData.Commands
{
    using static Testing;

    public class DeleteAccountDataTests : TestBase
    {
        ProjectItem _projectItem;

        [Test]
        public async Task ShouldDeleteAccountData()
        {
            //Arrange
            await SetUp();

            var command = new DeleteAccountDataCommand();

            //Act
            var result = await SendAsync(command);

            //Assert

            var projects = await SendAsync(new GetProjectItemsWithPaginationQuery
            {
                PageNumber = 1,
                PageSize = 50
            });

            var stopwatches = await SendAsync(new GetStopwatchItemsWithPaginationQuery
            {
                ProjectId = _projectItem.Id,
                PageNumber = 1,
                PageSize = 50
            });

            projects.Items.Should().BeEmpty();
            stopwatches.Items.Should().BeEmpty();
        }

        public async Task SetUp()
        {
            _projectItem = new()
            {
                Title = "project",
                Theme = "violet",
                Time = "10:10:10",
                Status = Status.Done
            };
            await AddAsync(_projectItem);

            await AddRangeAsync(new List<StopwatchItem> {
                new StopwatchItem
                {
                    ProjectItemId = _projectItem.Id,
                    Title = "stopwatch",
                    Status = Status.Done
                },
                new StopwatchItem
                {
                    ProjectItemId = _projectItem.Id,
                    Title = "stopwatch",
                     Status = Status.Done
                },
                  new StopwatchItem
                {
                    ProjectItemId = _projectItem.Id,
                    Title = "stopwatch",
                }
            });
        }
    }
}
