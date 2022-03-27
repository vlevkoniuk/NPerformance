using System.Collections.Generic;

namespace NPerformance.Models
{
    public class PerfModel
    {
        public Configuration Configuration {get;set;}
        public List<Request> Requests {get;set;}
        public List<UserRequest> UserRequests {get;set;}

    }
}