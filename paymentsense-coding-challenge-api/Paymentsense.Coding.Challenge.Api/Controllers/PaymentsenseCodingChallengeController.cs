using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Paymentsense.Coding.Challenge.Api.Models;
using Paymentsense.Coding.Challenge.Api.Services.Interfaces;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Paymentsense.Coding.Challenge.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentsenseCodingChallengeController : ControllerBase
    {
        private readonly ICountry _country;
        private readonly ILogger<PaymentsenseCodingChallengeController> _logger;

        public PaymentsenseCodingChallengeController(ICountry country, ILogger<PaymentsenseCodingChallengeController> logger)
        {
            _country = country;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("Paymentsense Coding Challenge!");
        }

        [Route("[action]")]
        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(IEnumerable<CountryDto>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetCountries()
        {
           var countries =  await _country.GetCountries();
            if (countries == null)
            {
                _logger.LogError("Countries not found.");
                return NotFound();
            }
            return Ok(countries);           
        }
    }
}
