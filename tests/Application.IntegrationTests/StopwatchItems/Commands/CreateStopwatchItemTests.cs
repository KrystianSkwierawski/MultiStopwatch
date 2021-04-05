using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.StopwatchItems.Commands.CreateStopwatchItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.StopwatchItems.Commands
{
    using static Testing;

    public class CreateStopwatchItemTests : TestBase
    {

        [Test]
        public async Task ShouldCreateStopwatchItem()
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

            var command = new CreateStopwatchItemCommand
            {
                ProjectItemId = project.Id,
                Title = stopwatch.Title,
                Theme = stopwatch.Theme,
                Time = stopwatch.Time
            };

            //Act
            await SendAsync(command);


            //Assert
            StopwatchItem result = await FindAsync<StopwatchItem>(stopwatch.Id);
            result.Should().NotBeNull();
            result.Title.Should().Be(command.Title);
        }
    }
}
