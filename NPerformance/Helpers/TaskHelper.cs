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

        public static void PrepareAndRunTasks(int userNo, PerfModel perfModel, List<PerfData> perfData)
        {
            List<Task> tsks = new List<Task>();
            var usrReqCollection = perfModel.UserRequests.Where(y => y.UserNo == userNo).First();
            Random random = new Random();
            RequestsSequence rSeq = usrReqCollection.RequestsSequences[random.Next(usrReqCollection.RequestsSequences.Count)];
            List<HttpRequests> clients = new List<HttpRequests>();
            int currentClientInList;
            foreach (int id in rSeq.Requests.Select(x => x.RequestId).Distinct())
            {
                HttpRequests client = new HttpRequests();
                client.InitializeClient(perfModel.Requests.Where(x => x.Id == id).FirstOrDefault().Url);
                if (!clients.Select(x => x.Url).ToList().Contains(client.Url))
                {
                    clients.Add(client);
                }
                currentClientInList = clients.IndexOf(client);
            }
            PerfData pd = new PerfData();
            Stopwatch stopwatch = Stopwatch.StartNew();
            foreach (RequestInfo req in rSeq.Requests)
            {
                var request = perfModel.Requests.Where(x => x.Id == req.RequestId).FirstOrDefault();
                var client = clients.Where(x => x.GetBaseUrl() == request.Url).FirstOrDefault();
                Task tsk = new Task(() => {
                    Stopwatch sw = Stopwatch.StartNew();
                    HttpStatusCode code = HttpRequests.SendRequestAndWaitResponse(client, request).Result;
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
                // foreach (var req in reqs)
                // {
                //     Task tsk = new Task(() => {
                //         Stopwatch sw = Stopwatch.StartNew();
                //         HttpStatusCode code = HttpRequests.SendRequestAndWaitResponse(client, req).Result;
                //         sw.Stop();
                //         lock (_locker)
                //         {
                //             pd.StatucCodes.Add(code);
                //             pd.RequestCompletionTimes.Add(sw.ElapsedMilliseconds);
                //             //pd.Orders.Add((int)Task.CurrentId);
                //         }
                //     });
                //     tsk.Start();
                //     tsks.Add(tsk);

                // }

            }
            Task.WaitAll(tsks.ToArray());
            stopwatch.Stop();
            pd.RequestCompletionTime = stopwatch.ElapsedMilliseconds;
            lock (_locker)
            {
                pd.UserNo = userNo;
                perfData.Add(pd);

            }
        }

        // public static async Task<List<HttpStatusCode>>  CreateAsync(int userNo, List<UserRequest> reqCollection, List<PerfData> perfData)
        // {
        //     List<HttpStatusCode> rCodes =  new List<HttpStatusCode>();
        //     var usrReqCollection = reqCollection.Where(x => x.UserNo == userNo).FirstOrDefault().RequestsSequences;
        //     Random random = new Random();
        //     RequestsSequence rSeq = usrReqCollection[random.Next(usrReqCollection.Count)];
        //     List<HttpRequests> clients = new List<HttpRequests>();
        //     foreach (string url in rSeq.Requests.Select(x => x.Url).Distinct())
        //     {
        //         HttpRequests client = new HttpRequests();
        //         client.InitializeClient(url);
        //         clients.Add(client);
        //     }
        //     PerfData pd = new PerfData();
        //     Stopwatch stopwatch = Stopwatch.StartNew();
        //     foreach (var client in clients)
        //     {
        //         var reqs = rSeq.Requests.Where(x => x.Url.Equals(client.GetBaseUrl())).ToList();
        //         foreach (var req in reqs)
        //         {
        //             HttpStatusCode code = await HttpRequests.SendRequestAndWaitResponse(client, req);
        //             lock (_locker)
        //             {
        //                 rCodes.Add(code);
        //                 pd.StatucCodes.Add(code);
        //                 //pd.Orders.Add((int)Task.CurrentId);
        //             }
                    
        //         }

        //     }
        //     stopwatch.Stop();
        //     lock (_locker)
        //     {
        //         pd.RequestCompletionTime = stopwatch.ElapsedMilliseconds;
        //         pd.UserNo = userNo;
        //         perfData.Add(pd);
                
        //     }
        //     return rCodes;
        // }
    }
}
