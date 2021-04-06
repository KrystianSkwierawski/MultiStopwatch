using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.ProjectItems.Commands
{
    using static Testing;
    public class CreateProjectItemTests
    {
        [Test]
        public async Task ShouldCreateProjectItem()
        {
            //Arrange
            var command = new CreateProjectItemCommand { Title = "project", Theme = "violet" };

            //Act
            var projectId = await SendAsync(command);

            //Assert
            ProjectItem result = await FindAsync<ProjectItem>(projectId);

            result.Should().NotBeNull();
            result.Title.Should().Be(command.Title);
            result.Theme.Should().Be(command.Theme);
        }
    }
}
