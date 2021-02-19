using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Paymentsense.Coding.Challenge.Api.Controllers;
using Paymentsense.Coding.Challenge.Api.Services.Interfaces;
using Xunit;

namespace Paymentsense.Coding.Challenge.Api.Tests.Controllers
{
    public class PaymentsenseCodingChallengeControllerTests
    {
        [Fact]
        public void Get_OnInvoke_ReturnsExpectedMessage()
        {
            var countryInterfaceMock = new Mock<ICountry>();
            var loggerMock = new Mock<ILogger<PaymentsenseCodingChallengeController>>();
            var controller = new PaymentsenseCodingChallengeController(countryInterfaceMock.Object, loggerMock.Object);

            var result = controller.Get().Result as OkObjectResult;

            result.StatusCode.Should().Be(StatusCodes.Status200OK);
            result.Value.Should().Be("Paymentsense Coding Challenge!");
        }
    }
}
