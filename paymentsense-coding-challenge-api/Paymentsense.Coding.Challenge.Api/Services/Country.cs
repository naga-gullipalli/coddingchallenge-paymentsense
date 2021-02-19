using Paymentsense.Coding.Challenge.Api.Models;
using Paymentsense.Coding.Challenge.Api.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Linq;
using Paymentsense.Coding.Challenge.Api.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Paymentsense.Coding.Challenge.Api.Services
{
    public class Country : ICountry
    {
        private readonly HttpClient _httpclient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<Country> _logger;
        public Country(HttpClient httpclient, IConfiguration configuration, ILogger<Country> logger)
        {
            _httpclient = httpclient;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<PagedList<CountryDto>> GetCountries(CountryParams countryParams)
        {
           PagedList<CountryDto> result = null;
            try
            {
                var options = GetCaseSensitiveOption();
                var streamTask = GetJsonStream();
                var countries = await JsonSerializer.DeserializeAsync<List<CountryDto>>(await streamTask, options);

                result = PagedList<CountryDto>.Create(countries, countryParams.PageNumber, countryParams.PageSize);

            }
            catch (Exception)
            {
                //Log exception
            }
            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="countryName"></param>
        /// <returns></returns>
        public async Task<CountryDto> GetCountrybyName(string countryName)
        {
            CountryDto country = null;
            try
            {
                var options = GetCaseSensitiveOption();
                var streamTask = GetJsonStream();
                var countries = await JsonSerializer.DeserializeAsync<List<CountryDto>>(await streamTask, options);
                country = countries.Where(a => a.Name == countryName).FirstOrDefault();
            }
            catch (Exception)
            {
                //Log exception
            }
            return country;
        }

        /// <summary>
        /// calls external api and gets steam back
        /// </summary>
        /// <returns></returns>
        private Task<Stream> GetJsonStream()
        {
            _httpclient.DefaultRequestHeaders.Accept.Clear();
            _httpclient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return _httpclient.GetStreamAsync(_configuration.GetValue<string>("CountryAPI"));
        }

        /// <summary>
        /// specifies camel case options for DTO
        /// </summary>
        /// <returns></returns>
        private JsonSerializerOptions GetCaseSensitiveOption()
        {
            var options = new JsonSerializerOptions();
            options.PropertyNameCaseInsensitive = true;
            options.Converters.Add(new JsonStringEnumConverter());
            return options;
        }
    }
}
