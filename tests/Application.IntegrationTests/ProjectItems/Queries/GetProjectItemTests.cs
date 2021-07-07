using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.ProjectItems.Queries.GetProjectItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.ProjectItems.Queries
{
    using static Testing;
    public class GetProjectItemTests : TestBase
    {
        [Test]
        public async Task ShouldReturnProjectItem()
        {
            //Arrange
            ProjectItem project = new()
            {
                Title = "project",
                Theme = "violet",
                IsDone = false
            };

            var projectId = await SendAsync(new CreateProjectItemCommand
            {
                Title = project.Title,
                Theme = project.Theme
            });

            GetProjectItemQuery query = new() { Id = projectId };

            //Act
            ProjectItemDto result = await SendAsync(query);

            //Assert
            result.Should().NotBeNull();
            result.Title.Should().Be(project.Title);
            result.Theme.Should().Be(project.Theme);
        }
    }
}
