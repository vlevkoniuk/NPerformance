﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Http;
using System.Net;

namespace NPerformance.Models
{
    public class PerfData
    {
        public long RequestCompletionTime { get; set; }
        public List<long> RequestCompletionTimes { get; set; }
        public HttpStatusCode StatucCode { get; set; }
        public List<HttpStatusCode> StatucCodes { get; set; }
        public long Order { get; set; }
        public List<long> Orders { get; set; }
        public int UserNo { get; set; }

        public PerfData()
        {
            RequestCompletionTime = 0;
            RequestCompletionTimes = new List<long>();
            StatucCode = HttpStatusCode.Created;
            StatucCodes = new List<HttpStatusCode>();
            Order = 0;
            Orders = new List<long>();
            UserNo = 0;
        }
    }
}
