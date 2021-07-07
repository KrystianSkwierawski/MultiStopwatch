using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.StopwatchItems.Commands.CreateStopwatchItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.StopwatchItems.Commands
{
    using static Testing;

    public class CreateStopwatchItemTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateStopwatchItemCommand { Time = "00:00:00"};

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldCreateStopwatchItem()
        {
            //Arrange
            var projectId = await SendAsync(new CreateProjectItemCommand
            {
                Title = "project",
                Theme = "violet"
            });

            CreateStopwatchItemCommand command = new()
            {
                ProjectItemId = projectId,
                Title = "stopwatch",
                Theme = "violet",
                Time = "00:00:00"
            };

            //Act
            var stopwatchId = await SendAsync(command);

            //Assert
            StopwatchItem result = await FindAsync<StopwatchItem>(stopwatchId);
            result.Should().NotBeNull();
            result.Title.Should().Be(command.Title);
        }
    }
}
