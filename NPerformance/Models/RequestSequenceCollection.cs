using System;
using System.Collections.Generic;
using System.Text;

namespace NPerformance.Models
{
    public class RequestSequenceCollection
    {
        public int UserNo { get; set; }
        public List<RequestsSequence> RequestsSequences { get; set; } 
    }
}
