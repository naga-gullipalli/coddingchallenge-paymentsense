using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paymentsense.Coding.Challenge.Api.Models
{
    public class LanguageDto
    {
        public string iso639_1 { get; set; }
        public string iso639_2 { get; set; }
        public string Name { get; set; }
        public string NativeName { get; set; }

    }
}
