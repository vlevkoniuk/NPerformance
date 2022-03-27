namespace NPerformance.Models
{
    public class Configuration
    {
        public int TestDurationS {get;set;}
		public int WarmUpDurationS {get;set;}
		public int RequestSequenceWaitIntervalMs {get;set;}
		public int UsersCountToTest {get;set;}
		public string Description {get;set;}
		public int MaxWaitResponseTimeS {get;set;}
    }
}