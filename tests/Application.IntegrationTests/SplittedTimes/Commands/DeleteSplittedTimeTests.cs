using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.SplittedTimes.Commands.CreateSplittedTime;
using Project.Application.SplittedTimes.Commands.DeleteSplittedTime;
using Project.Application.StopwatchItems.Commands.CreateStopwatchItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.SplittedTimes.Commands
{
    using static Testing;
    public class DeleteSplittedTimeTests : TestBase
    {
        [Test]
        public void ShouldRequireValidSplittedTimeId()
        {
            var command = new DeleteSplittedTimeCommand { Id = 999 };

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldDeleteSplittedTime()
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
                Time = "00:00:00",
                IsDone = false
            });

            var splittedTime = await SendAsync(new CreateSplittedTimeCommand
            {
                StopwatchItemId = stopwatchId,
                Time = "00:00:00"
            });

            DeleteSplittedTimeCommand command = new()
            {
                Id = splittedTime.Id
            };

            //Act
            await SendAsync(command);

            //Assert
            SplittedTime result = await FindAsync<SplittedTime>(splittedTime.Id);
            result.Should().BeNull();
        }
    }
}
