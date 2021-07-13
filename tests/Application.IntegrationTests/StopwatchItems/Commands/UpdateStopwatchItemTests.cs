using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.StopwatchItems.Commands.CreateStopwatchItem;
using Project.Application.StopwatchItems.Commands.UpdateStopwatchItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.StopwatchItems.Commands
{
    using static Testing;
    public class UpdateStopwatchItemTests : TestBase
    {
        [Test]
        public void ShouldRequireValidStopwatchItemId()
        {
            var command = new UpdateStopwatchItemCommand
            {
                Id = 999,
                Title = "New Title",
                Theme = "red",
                Time = "50:00:00",
                Status = "done"
            };

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldUpdateStopwatchItem()
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

            UpdateStopwatchItemCommand command = new()
            {
                Id = stopwatchId,
                Title = "stopwatch2",
                Theme = "red",
                Time = "50:00:00",
                Status = "done"
            };

            //Act
            await SendAsync(command);

            //Assert
            StopwatchItem result = await FindAsync<StopwatchItem>(stopwatchId);
            result.Should().NotBeNull();
            result.Title.Should().Be(command.Title);
            result.Theme.Should().Be(command.Theme);
            result.Time.Should().Be(command.Time);
            result.Status.Should().Be(command.Status);
        }
    }
}
