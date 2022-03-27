using System;
using System.Collections.Generic;
using System.Text;

namespace NPerformance.Models
{
    public class UserRequest
    {
        public int UserNo { get; set; }
        public string UserName { get; set; }
		public string UserPwd { get; set; }
		public string Description { get; set; }
        public List<RequestsSequence> RequestsSequences { get; set; } 
    }
}
