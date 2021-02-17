using Paymentsense.Coding.Challenge.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paymentsense.Coding.Challenge.Api.Services.Interfaces
{
    public interface ICountry
    {
        public Task<IEnumerable<CountryDto>> GetCountries();
    }
}
