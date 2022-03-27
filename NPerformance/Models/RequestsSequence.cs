using System;
using System.Collections.Generic;
using System.Text;

namespace NPerformance.Models
{
    public class RequestsSequence
    {
        public string Description { get; set; }
        public List<RequestInfo> Requests { get; set; }
    }
}
