using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paymentsense.Coding.Challenge.Api.Models
{
    public class CountryDto
    {
        public string Name { get; set; }
        public string Flag { get; set; }
        public int? Population { get; set; }
        public string Capital { get; set; }
        public List<string> Timezones { get; set; }

        public List<IDictionary<string, string>> Currencies { get; set; }
        public List<IDictionary<string, string>> Languages { get; set; }

        public List<string> Borders { get; set; }
    }
}
