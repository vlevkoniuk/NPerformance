using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using NPerformance.Models;

namespace NPerformance.Helpers
{
    public static class TaskHelper
    {
        static List<PerfData> perfData = new List<PerfData>();
        private static readonly object _locker = new object();

        public static Task PrepareTask(int userNo, List<RequestSequenceCollection> reqCollection, List<PerfData> perfData)
        {
            var usrReqCollection = reqCollection.Where(x => x.UserNo == userNo).FirstOrDefault().RequestsSequences;
            Random random = new Random();
            RequestsSequence rSeq = usrReqCollection[random.Next(usrReqCollection.Count)];
            List<HttpRequests> clients = new List<HttpRequests>();
            foreach (string url in rSeq.Requests.Select(x => x.Url))
            {
                HttpRequests client = new HttpRequests();
                client.InitializeClient(url);
                clients.Add(client);
            }


            Task t = new Task(async () =>
            {
                PerfData pd = new PerfData();
                Stopwatch stopwatch = Stopwatch.StartNew();
                foreach (var client in clients)
                {
                    var reqs = rSeq.Requests.Where(x => x.Url.Equals(client.Url)).ToList();
                    foreach (var req in reqs)
                    {
                        HttpStatusCode code = await HttpRequests.SendRequestAndWaitResponse(client, req);
                        pd.StatucCodes.Add(code);
                        pd.Orders.Add((int)Task.CurrentId);
                    }

                }
                stopwatch.Stop();
                pd.RequestCompletionTime = stopwatch.ElapsedMilliseconds;
                lock (_locker)
                {
                    perfData.Add(pd);
                }
            });
            return t;
        }
    }
}
