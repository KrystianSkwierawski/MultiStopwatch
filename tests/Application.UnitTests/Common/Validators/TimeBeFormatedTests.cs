using FluentAssertions;
using NUnit.Framework;
using Project.Application.Common.Validators;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.UnitTests.Common.Validators
{
    public class TimeBeFormatedTests
    {
        [Test]
        [TestCase("00:00:00")]
        [TestCase("000:00:00")]
        [TestCase("0000:00:00")]
        [TestCase("00000:00:00")]
        public async Task ShouldReturnTrueIfCorrectValue(string time)
        {
            bool result = await TimeBeFormated.BeFormated(time, CancellationToken.None);

            result.Should().BeTrue();
        }

        [Test]
        [TestCase("000000:00:00")]
        [TestCase("0:0:0")]
        public async Task ShouldReturnFalseIfIncorrectValue(string time)
        {
            bool result = await TimeBeFormated.BeFormated(time, CancellationToken.None);

            result.Should().BeFalse();
        }
    }
}
