using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.FavoriteProjectItems.Queries.GetFavoriteProjectsItems;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.FavoriteProjectItems.Queries
{
    using static Testing;
    public class GetFavoriteProjectsItemsTests
    {
        [Test]
        public async Task ShouldReturnAllFavoriteProjectItems()
        {
            //Arrange
            await AddAllAsync(new List<ProjectItem> {
                new ProjectItem { IsFavorite = true, Title = "favorite"},
                new ProjectItem { IsFavorite = true, Title = "favorite"},
                new ProjectItem { IsFavorite = false, Title = "not a favorite"}
            });

            var query = new GetFavoriteProjectsItemsQuery();

            //Act
            var result = await SendAsync(query);

            //Assert
            result.Should().NotBeNull();
            result.All(x => x.Title == "favorite").Should().BeTrue();
        }
    }
}
