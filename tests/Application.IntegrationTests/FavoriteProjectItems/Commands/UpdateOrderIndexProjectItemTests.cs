using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.FavoriteProjectItems.Commands.UpdateOrderIndex;
using Project.Application.FavoriteProjectItems.Queries.GetFavoriteProjectsItems;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.FavoriteProjectItems.Commands
{
    using static Testing;
    public class UpdateOrderIndexProjectItemTests : TestBase
    {
        [Test]
        public async Task ShouldUpdateOrderIndex()
        {
            //Arrange
            await AddRangeAsync(new List<ProjectItem> {
                new ProjectItem
                {
                    Title = "favorite",
                    IsFavorite = true,
                    OrderIndex = 1
                },
                new ProjectItem
                {
                    Title = "favorite",
                    IsFavorite = true,
                    OrderIndex = 2
                },
                new ProjectItem
                {
                    Title = "favorite",
                    IsFavorite = true,
                    OrderIndex = 3
                }
            });

            List<FavoriteProjectItemDto> projectItems = await SendAsync(new GetFavoriteProjectsItemsQuery());
            UpdateOrderIndexProjectItemCommand command = new() { CurrentProjects = projectItems.OrderByDescending(x => x.Id).ToList() };

            //Act
            await SendAsync(command);

            //Assert
            List<FavoriteProjectItemDto> result = await SendAsync(new GetFavoriteProjectsItemsQuery());

            result.Should().NotBeNull();
            foreach (var currentProject in result)
            {
                FavoriteProjectItemDto previousProject = projectItems.FirstOrDefault(x => x.Id == currentProject.Id);
                currentProject.OrderIndex.Should().NotBe(previousProject.OrderIndex);
            }
        }
    }
}
