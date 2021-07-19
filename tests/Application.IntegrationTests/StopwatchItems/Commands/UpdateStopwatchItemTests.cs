using Domain.Entities;
using Domain.Enums;
using Domain.ValueObjects;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.StopwatchItems.Commands.CreateStopwatchItem;
using Project.Application.StopwatchItems.Commands.UpdateStopwatchItem;
using System.Collections.Generic;
using System.Linq;
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
                Status = Status.Done
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
                Status = Status.Done,
                SplittedTimes = new List<SplittedTime>
                {
                    new ("00:00:00"),
                    new ("00:00:00")
                }
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

            result.SplittedTimes.Count().Should().Be(
                command.SplittedTimes.Count()
                );
        }
    }
}
