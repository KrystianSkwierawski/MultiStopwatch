using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.SplittedTimes.Commands.CreateSplittedTime;
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

            var command = new CreateSplittedTimeCommand
            {
                StopwatchItemId = stopwatch.Id,
                Time = stopwatch.Time
            };

            //Act
            SplittedTimeDto result = await SendAsync(command);

            //Assert
            result.Should().NotBeNull();
            result.Time.Should().Be(command.Time);
        }
    }
}
