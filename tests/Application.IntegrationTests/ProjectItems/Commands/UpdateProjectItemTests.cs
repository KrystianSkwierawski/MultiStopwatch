using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.ProjectItems.Commands.UpdateProjectItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.ProjectItems.Commands
{
    using static Testing;
    public class UpdateProjectItemTests : TestBase
    {
        [Test]
        public async Task ShouldUpdateProjectItem()
        {
            //Arrange
            var projectId = await SendAsync(new CreateProjectItemCommand
            {
                Title = "project",
                Theme = "violet"
            });

            var command = new UpdateProjectItemCommand
            {
                Id = projectId,
                Title = "project2",
                Theme = "red",
                Time = "50:00:00"
            };

            //Act
            await SendAsync(command);

            //Assert
            ProjectItem result = await FindAsync<ProjectItem>(projectId);

            result.Should().NotBeNull();
            result.Title.Should().Be(command.Title);
            result.Theme.Should().Be(command.Theme);
            result.Time.Should().Be(command.Time);
        }
    }
}
