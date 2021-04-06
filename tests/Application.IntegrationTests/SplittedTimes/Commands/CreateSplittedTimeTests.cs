using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.SplittedTimes.Commands.CreateSplittedTime;
using Project.Application.StopwatchItems.Commands.CreateStopwatchItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.SplittedTimes.Commands
{
    using static Testing;
    public class CreateSplittedTimeTests
    {
        [Test]
        public async Task ShouldCreteAndReturnSplittedTime()
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
                Time = "00:00:00"
            });

            var command = new CreateSplittedTimeCommand
            {
                StopwatchItemId = stopwatchId,
                Time = "00:00:00"
            };

            //Act
            SplittedTimeDto result = await SendAsync(command);

            //Assert
            result.Should().NotBeNull();
            result.Time.Should().Be(command.Time);
        }
    }
}
