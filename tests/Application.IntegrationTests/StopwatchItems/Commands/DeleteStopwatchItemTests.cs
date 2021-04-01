using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.StopwatchItems.Commands.DeleteStopwatchItem;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.IntegrationTests.StopwatchItems.Commands
{
    using static Testing;
    public class DeleteStopwatchItemTests : TestBase
    {
        [Test]
        public void ShouldRequireValidStopwatchItemId()
        {
            var command = new DeleteStopwatchItemCommand { Id = 99 };

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldDeleteStopwatchItem()
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

            var command = new DeleteStopwatchItemCommand
            {
                Id = stopwatch.Id
            };

            //Act
            await SendAsync(command);

            //Assert
            StopwatchItem result = await FindAsync<StopwatchItem>(stopwatch.Id);
            result.Should().BeNull();
        }
    }
}
