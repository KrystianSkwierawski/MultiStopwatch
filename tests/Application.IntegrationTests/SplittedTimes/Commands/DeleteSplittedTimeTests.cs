using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.SplittedTimes.Commands.DeleteSplittedTime;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.IntegrationTests.SplittedTimes.Commands
{
    using static Testing;
    public class DeleteSplittedTimeTests
    {
        [Test]
        public void ShouldRequireValidSplittedTimeId()
        {
            var command = new DeleteSplittedTimeCommand { Id = 99 };

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldDeleteSplittedTime()
        {
            //Arrange
            ProjectItem project = new ProjectItem
            {
                Title = "project"
            };
            await AddAsync(project);

            StopwatchItem stopwatch = new StopwatchItem
            {
                ProjectItemId = project.Id,
                Title = "stopwatch",
                Theme = "violet",
                Time = "00:00:00"
            };
            await AddAsync(stopwatch);

            SplittedTime splittedTime = new SplittedTime
            {
                StopwatchItemId = stopwatch.Id,
                Time = stopwatch.Time
            };
            await AddAsync(splittedTime);

            var command = new DeleteSplittedTimeCommand
            {
                Id = splittedTime.Id
            };

            //Act
            await SendAsync(command);

            //Assert
            SplittedTime result = await FindAsync<SplittedTime>(splittedTime.Id);
        }
    }
}
