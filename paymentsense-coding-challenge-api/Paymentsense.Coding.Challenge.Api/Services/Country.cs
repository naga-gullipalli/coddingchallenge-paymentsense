using Paymentsense.Coding.Challenge.Api.Models;
using Paymentsense.Coding.Challenge.Api.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Paymentsense.Coding.Challenge.Api.Services
{
    public class Country : ICountry
    {
        private readonly HttpClient _httpclient;
        public Country(HttpClient httpclient)
        {
            _httpclient = httpclient;
        }

        public async Task<IEnumerable<CountryDto>> GetCountries()
        {
            List<CountryDto> repositories = null;
            try
            {
                var options = new JsonSerializerOptions();
                options.PropertyNameCaseInsensitive = true;
                options.Converters.Add(new JsonStringEnumConverter());

                _httpclient.DefaultRequestHeaders.Accept.Clear();
                _httpclient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var streamTask = _httpclient.GetStreamAsync("https://restcountries.eu/rest/v2/all");
                repositories = await JsonSerializer.DeserializeAsync<List<CountryDto>>(await streamTask, options);
            }
            catch (Exception ex)
            {
                //Log exception
            }
            return repositories;
        }
    }
}
