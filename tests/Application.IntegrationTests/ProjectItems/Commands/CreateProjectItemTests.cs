using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.ProjectItems.Commands
{
    using static Testing;
    public class CreateProjectItemTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateProjectItemCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldCreateProjectItem()
        {
            //Arrange
            CreateProjectItemCommand command = new() { Title = "project", Theme = "violet" };

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
