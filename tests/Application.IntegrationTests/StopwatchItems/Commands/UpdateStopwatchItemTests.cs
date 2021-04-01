using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.StopwatchItems.Commands.UpdateStopwatchItem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.IntegrationTests.StopwatchItems.Commands
{
    using static Testing;
    public class UpdateStopwatchItemTests
    {
        [Test]
        public async Task ShouldRequireFormatedTime()
        {
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

            var command = new UpdateStopwatchItemCommand
            {
                Id = stopwatch.Id,
                Title = "stopwatch1",
                Theme = "violet",
                Time = "00:00"
            };

            FluentActions.Invoking(() =>
                SendAsync(command))
                    .Should().Throw<ValidationException>().Where(ex => ex.Errors.ContainsKey("Time"))
                    .And.Errors["Time"].Should().Contain("Title must be formated \"00:00:00\".");
        }

        [Test]
        public async Task ShouldUpdateStopwatchItem()
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

            var command = new UpdateStopwatchItemCommand
            {
                Id = stopwatch.Id,
                Title = "stopwatch2",
                Theme = "red",
                Time = "50:00:00"
            };

            //Act
            await SendAsync(command);

            //Assert
            StopwatchItem result = await FindAsync<StopwatchItem>(stopwatch.Id);
            result.Should().NotBeNull();
            result.Title.Should().Be(command.Title);
            result.Theme.Should().Be(command.Theme);
            result.Time.Should().Be(command.Time);

        }
    }
}
