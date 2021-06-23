using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Exceptions;
using Project.Application.ProjectItems.Commands.CreateProjectItem;
using Project.Application.ProjectItems.Commands.DeleteProjectItem;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.ProjectItems.Commands
{
    using static Testing;
    public class DeleteProjectItemTests : TestBase
    {
        [Test]
        public async Task ShouldDeleteProjectItem()
        {
            //Arrange
            var projectId = await SendAsync(new CreateProjectItemCommand
            {
                Title = "project",
                Theme = "violet"
            });

            //Act
            await SendAsync(new DeleteProjectItemCommand
            {
                Id = projectId
            });

            //Assert
            var result = await FindAsync<ProjectItem>(projectId);
            result.Should().BeNull();
        }
    }
}
