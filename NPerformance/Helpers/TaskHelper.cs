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

        public static void PrepareAndRunTasks(int userNo, List<RequestSequenceCollection> reqCollection, List<PerfData> perfData)
        {
            List<Task> tsks = new List<Task>();
            var usrReqCollection = reqCollection.Where(x => x.UserNo == userNo).FirstOrDefault().RequestsSequences;
            Random random = new Random();
            RequestsSequence rSeq = usrReqCollection[random.Next(usrReqCollection.Count)];
            List<HttpRequests> clients = new List<HttpRequests>();
            foreach (string url in rSeq.Requests.Select(x => x.Url).Distinct())
            {
                HttpRequests client = new HttpRequests();
                client.InitializeClient(url);
                clients.Add(client);
            }
            PerfData pd = new PerfData();
            Stopwatch stopwatch = Stopwatch.StartNew();
            foreach (var client in clients)
            {
                var reqs = rSeq.Requests.Where(x => x.Url.Equals(client.GetBaseUrl())).ToList();
                foreach (var req in reqs)
                {
                    Task tsk = new Task(() => {
                        Stopwatch sw = Stopwatch.StartNew();
                        HttpStatusCode code = HttpRequests.SendRequestAndWaitResponse(client, req).Result;
                        sw.Stop();
                        lock (_locker)
                        {
                            pd.StatucCodes.Add(code);
                            pd.RequestCompletionTimes.Add(sw.ElapsedMilliseconds);
                            //pd.Orders.Add((int)Task.CurrentId);
                        }
                    });
                    tsk.Start();
                    tsks.Add(tsk);

                }

            }
            Task.WaitAll(tsks.ToArray());
            stopwatch.Stop();
            pd.RequestCompletionTime = stopwatch.ElapsedMilliseconds;
            lock (_locker)
            {
                perfData.Add(pd);

            }
        }

        public static async Task<List<HttpStatusCode>>  CreateAsync(int userNo, List<RequestSequenceCollection> reqCollection, List<PerfData> perfData)
        {
            List<HttpStatusCode> rCodes =  new List<HttpStatusCode>();
            var usrReqCollection = reqCollection.Where(x => x.UserNo == userNo).FirstOrDefault().RequestsSequences;
            Random random = new Random();
            RequestsSequence rSeq = usrReqCollection[random.Next(usrReqCollection.Count)];
            List<HttpRequests> clients = new List<HttpRequests>();
            foreach (string url in rSeq.Requests.Select(x => x.Url).Distinct())
            {
                HttpRequests client = new HttpRequests();
                client.InitializeClient(url);
                clients.Add(client);
            }
            PerfData pd = new PerfData();
            Stopwatch stopwatch = Stopwatch.StartNew();
            foreach (var client in clients)
            {
                var reqs = rSeq.Requests.Where(x => x.Url.Equals(client.GetBaseUrl())).ToList();
                foreach (var req in reqs)
                {
                    HttpStatusCode code = await HttpRequests.SendRequestAndWaitResponse(client, req);
                    lock (_locker)
                    {
                        rCodes.Add(code);
                        pd.StatucCodes.Add(code);
                        //pd.Orders.Add((int)Task.CurrentId);
                    }
                    
                }

            }
            stopwatch.Stop();
            pd.RequestCompletionTime = stopwatch.ElapsedMilliseconds;
            lock (_locker)
            {
                perfData.Add(pd);
                
            }
            return rCodes;
        }
    }
}
