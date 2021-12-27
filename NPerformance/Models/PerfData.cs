using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Http;
using System.Net;

namespace NPerformance.Models
{
    public class PerfData
    {
        public long RequestCompletionTime { get; set; }
        public HttpStatusCode StatucCode { get; set; }
        public long Order { get; set; }
        int UserNo { get; set; }

        public PerfData()
        {
            RequestCompletionTime = 0;
            StatucCode = HttpStatusCode.Created;
            Order = 0;
            UserNo = 0;
        }
    }
}
