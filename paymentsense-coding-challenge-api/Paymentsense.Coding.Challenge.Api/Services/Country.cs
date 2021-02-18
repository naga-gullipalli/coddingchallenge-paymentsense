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
            List<CountryDto> countries = null;
            try
            {
                var options = GetCaseSensitiveOption();
                var streamTask = GetJsonStream();
                countries = await JsonSerializer.DeserializeAsync<List<CountryDto>>(await streamTask, options);
            }
            catch (Exception ex)
            {
                //Log exception
            }
            return countries;
        }

        /// <summary>
        /// TODO: try/catch
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
            catch (Exception ex)
            {
                //Log exception
            }
            return country;
        }

        /// <summary>
        /// TODO: hard coded string needs to be moved
        /// </summary>
        /// <returns></returns>
        private Task<Stream> GetJsonStream()
        {
            _httpclient.DefaultRequestHeaders.Accept.Clear();
            _httpclient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            return _httpclient.GetStreamAsync("https://restcountries.eu/rest/v2/all");
        }

        private JsonSerializerOptions GetCaseSensitiveOption()
        {
            var options = new JsonSerializerOptions();
            options.PropertyNameCaseInsensitive = true;
            options.Converters.Add(new JsonStringEnumConverter());
            return options;
        }
    }
}
