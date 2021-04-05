﻿using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using Project.Application.FavoriteProjectItems.Queries.GetFavoriteProjectsItems;
using System.Linq;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.IntegrationTests.FavoriteProjectItems.Queries
{
    using static Testing;
    public class GetFavoriteProjectsItemsTests
    {
        [Test]
        public async Task ShouldReturnAllFavoriteProjectItems()
        {
            //Arrange
            await AddAllAsync(new ProjectItem[] {
                new ProjectItem { IsFavorite = true, Title = "favorite"},
                new ProjectItem { IsFavorite = true, Title = "favorite"},
                new ProjectItem { IsFavorite = false, Title = "not a favorite"}
            });

            var query = new GetFavoriteProjectsItemsQuery();

            //Act
            var result = await SendAsync(query);

            //Assert
            result.Should().HaveCount(2);
            result.First().Title.Should().Be("favorite");
        }
    }
}
