using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.FavoriteProjectItems.Commands.LikeOrDislikeProjectItem;
using System.Threading.Tasks;

namespace  Project.Application.IntegrationTests.SplittedTimes.Commands
{
    using static Testing;
    public class LikeOrDislikeProjectItemTests
    {
        [Test]
        public async Task ShouldLikeProjectItem()
        {
            //Arrange
            ProjectItem projectItem = new ProjectItem
            {
                Title = "project",
                IsFavorite = false
            };
            await AddAsync(projectItem);

            var command = new LikeOrDislikeProjectItemCommand
            {
                Id = projectItem.Id
            };

            //Act
            await SendAsync(command);

            //Assert
            ProjectItem result = await FindAsync<ProjectItem>(command.Id);
            result.Should().NotBeNull();
            result.IsFavorite.Should().BeTrue();
        }

        [Test]
        public async Task ShouldDisikeProjectItem()
        {
            //Arrange
            ProjectItem projectItem = new ProjectItem
            {
                Title = "project",
                IsFavorite = true
            };
            await AddAsync(projectItem);

            var command = new LikeOrDislikeProjectItemCommand
            {
                Id = projectItem.Id
            };

            //Act
            await SendAsync(command);

            //Assert
            ProjectItem result = await FindAsync<ProjectItem>(command.Id);
            result.Should().NotBeNull();
            result.IsFavorite.Should().BeFalse();
        }
    }
}
