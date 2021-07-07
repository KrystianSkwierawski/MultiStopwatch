using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.StopwatchItems.Commands.CreateStopwatchItem;
using Project.Application.StopwatchItems.Commands.DeleteStopwatchItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.StopwatchItems.Commands
{
    using static Testing;
    public class DeleteStopwatchItemTests : TestBase
    {
        [Test]
        public void ShouldRequireValidStopwatchItemId()
        {
            var command = new DeleteStopwatchItemCommand { Id = 999 };

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldDeleteStopwatchItem()
        {
            //Arrange
            var projectId = await SendAsync(new CreateProjectItemCommand
            {
                Title = "project",
                Theme = "violet"
            });

            var stopwatchId = await SendAsync(new CreateStopwatchItemCommand
            {
                ProjectItemId = projectId,
                Title = "stopwatch",
                Theme = "violet",
            });

            DeleteStopwatchItemCommand command = new()
            {
                Id = stopwatchId
            };

            //Act
            await SendAsync(command);

            //Assert
            StopwatchItem result = await FindAsync<StopwatchItem>(stopwatchId);
            result.Should().BeNull();
        }
    }
}
