using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Paymentsense.Coding.Challenge.Api.Controllers;
using Paymentsense.Coding.Challenge.Api.Extensions;
using Paymentsense.Coding.Challenge.Api.Helpers;
using Paymentsense.Coding.Challenge.Api.Models;
using Paymentsense.Coding.Challenge.Api.Services.Interfaces;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Xunit;
using System.Linq;

namespace Paymentsense.Coding.Challenge.Api.Tests.Controllers
{
    public class PaymentsenseCodingChallengeControllerTests
    {
        IEnumerable<CountryDto> Items = new List<CountryDto>() {
            new CountryDto() { Name = "India" },
            new CountryDto() { Name = "Australia" },
            new CountryDto() { Name = "America" },
            new CountryDto() { Name = "United Kingdom" },
            new CountryDto() { Name = "Germany" },
            new CountryDto() { Name = "France" }

        };
    
        [Fact]
        public void Get_OnInvoke_ReturnsExpectedMessage()
        {
            var countryInterfaceMock = new Mock<ICountry>();
            var loggerInterfaceMock = new Mock<ILogger<PaymentsenseCodingChallengeController>>();
            var controller = new PaymentsenseCodingChallengeController(countryInterfaceMock.Object, loggerInterfaceMock.Object);

            var result = controller.Get().Result as OkObjectResult;

            result.StatusCode.Should().Be(StatusCodes.Status200OK);
            result.Value.Should().Be("Paymentsense Coding Challenge!");
        }

        [Fact]
        public void GetCountries_ReturnsExpectedResponse()
        {
            CountryParams countryParams = new CountryParams();
            var httpContextMock = new DefaultHttpContext(); //mock a http context
 
            var countryInterfaceMock = new Mock<ICountry>();
            var loggerInterfaceMock = new Mock<ILogger<PaymentsenseCodingChallengeController>>();

            countryInterfaceMock.Setup(a => a.GetCountries(It.IsAny<CountryParams>())).Returns(Task.FromResult(new PagedList<CountryDto>(Items,6, 2, 2)));


            var controller = new PaymentsenseCodingChallengeController(countryInterfaceMock.Object, loggerInterfaceMock.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContextMock
                }
            };

            var result = controller.GetCountries(countryParams).Result;

            List<CountryDto> finalResult = (List<CountryDto>)((result.Result as OkObjectResult).Value);
            string headerValue = "{\"currentPage\":2,\"itemsPerPage\":2,\"totalItems\":6,\"totalPages\":3}";
            string headerResult = httpContextMock.Response.Headers["Pagination"];

            (result.Result as OkObjectResult).StatusCode.Should().Be(StatusCodes.Status200OK);
            Assert.NotNull(finalResult);
            Assert.Equal(Items, finalResult);
            Assert.Equal(Items.Count(), finalResult.Count());
            Assert.Equal(headerValue, headerResult);

        }
    }
}
