using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.JwtFeatures;
using Project.Domain.Entities;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Project.Application.IntegrationTests.Common
{
    using static Testing;
    public class JwtHandlerTests : TestBase
    {
        [Test]
        public async Task ShouldGenerateToken()
        {
            //Arrange
            ApplicationUser user = await CreateUserAsync();
            JwtHandler jwtHandler = GetJwtHandler();

            //Act
            List<Claim> claims = jwtHandler.GetClamis(user.Email, user.Id);
            string token = jwtHandler.GenerateToken(claims);

            //Assert
            token.Should().NotBeNullOrEmpty();
        }
    }
}
