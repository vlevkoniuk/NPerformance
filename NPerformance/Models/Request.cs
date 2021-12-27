using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace NPerformance.Models
{
    public class Request
    {
        public string Url { get; set; }
        public string Uri { get; set; }
        public string Mthod { get; set; }
        public string Body { get; set; }
        public List<Headers> Headers { get; set; }
    }
}
