using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NPerformance.Models;
using NPerformance.Helpers;
using System.Diagnostics;
using System.Net;
using System.Threading;
using System.Linq;
using System.IO;
using Newtonsoft.Json;

namespace NPerformance
{
    class Program
    {
        static List<PerfData> perfData = new List<PerfData>();
        static Dictionary<int, string> taskinfo = new Dictionary<int, string>();
        private static readonly object _locker = new object();
        private static readonly object _locker1 = new object();

        async static Task Main(string[] args)
        {
            List<RequestSequenceCollection> requestSequenceCollection = TestFilesHelper.ReadTestFile();
            List<Task> tasks = new List<Task>();
            Parallel.For(1, 3, (i) =>
            {
                Task t = new Task(() => {
                    TaskHelper.PrepareAndRunTasks(i, requestSequenceCollection, perfData);
                });
                lock (_locker)
                {
                    tasks.Add(t);
                }
            });

            for (int y = 0; y < tasks.Count; y++)
            {
                tasks[y].Start();
            }
            PerformTesting(tasks, requestSequenceCollection, 10, 50);
            Task.WaitAll(tasks.ToArray());

            TaskHelper.PrepareAndRunTasks(1, requestSequenceCollection, perfData);
            
            //var ttt = TaskHelper.CreateAsync(1, requestSequenceCollection, perfData);
            
            //EmulateUsersExecution(tasks, 10, 50, 20000, client, "weatherforecast/test");

            int cntNotOk = 0;
            //Verify if we have not OK requests
            foreach (var reqStatus in perfData.Select(x => x.StatucCode))
            {
                if (!reqStatus.Equals(HttpStatusCode.OK))
                {
                    cntNotOk++;
                }
            }

            Console.WriteLine($"Successfully Completed {perfData.Count} request during {10} ms");
            Console.WriteLine($"Average Request completion time is {perfData.Select( x => x.RequestCompletionTime).Average()} ms");
            Console.WriteLine($"NotOk status received for {cntNotOk}");

            Console.ReadKey();
            
            
        }

        static void PerformTesting(List<Task> tasks, List<RequestSequenceCollection> requestSequenceCollection, int cntSeconds, int delay)
        {
            Stopwatch sw = Stopwatch.StartNew();
            while (sw.ElapsedMilliseconds / 1000 < cntSeconds)
            {
                Parallel.ForEach(tasks, (element, loopstate, elementIndex) =>
                {
                    if (element.Status == TaskStatus.RanToCompletion)
                    {
                        Thread.Sleep(delay);
                        tasks[(int)elementIndex].ContinueWith(x => {
                            TaskHelper.PrepareAndRunTasks((int)elementIndex + 1, requestSequenceCollection, perfData);
                        });
                    }
                });
            }
            sw.Stop();
        }

        static List<Task> CreateThreadCalls(HttpRequests client,string uri, int cntCalls, int cntThreads)
        {
            List<Task> tasks = new List<Task>();
            for (int i = 0; i < cntCalls * cntThreads; i++)
            {
                Task t = new Task(async () =>
                {
                    PerfData pd = new PerfData();
                    Stopwatch sw = new Stopwatch();
                    sw.Start();
                    pd.Order = (int)Task.CurrentId;
                    pd.StatucCode = await client.GetAsyncStatucCode(uri);
                    sw.Stop();
                    pd.RequestCompletionTime = sw.ElapsedMilliseconds;
                    lock (_locker)
                    {
                        perfData.Add(pd);
                    }
                    

                });
                
                tasks.Add(t);
            }

            return tasks;
        }

        static List<Task> CreateThreadCalls(HttpRequests client, string uri, int usrCounts)
        {
            List<Task> tasks = new List<Task>();
            for (int i = 0; i < usrCounts; i++)
            {
                Task t = new Task(async () =>
                {
                    PerfData pd = new PerfData();
                    Stopwatch sw = new Stopwatch();
                    sw.Start();
                    pd.Order = (int)Task.CurrentId;
                    pd.StatucCode = await client.GetAsyncStatucCode(uri);
                    sw.Stop();
                    pd.RequestCompletionTime = sw.ElapsedMilliseconds;
                    lock (_locker)
                    {
                        perfData.Add(pd);
                    }


                });

                tasks.Add(t);
            }

            return tasks;
        }

        static async void ThreadedStartExecution(List<Task> tasks, int threadCnt, int delay)
        {
            int cnt = tasks.Count;
            var tasksPool = tasks;
            for (int i = 0; i < cnt; i++)
            {
                //await Task.Run(() => tasks[i].Start());
                tasks[i].Start();
                if (i % threadCnt == 0)
                {
                    Thread.Sleep(delay);
                }
            }
            Task.WaitAll(tasks.ToArray());
            for (int i = 0; i < cnt; i++)
            {
                if(tasks[i].IsCanceled || tasks[i].IsFaulted)
                    taskinfo.Add(i, tasks[i].Status.ToString());
            }
        }

        static async void EmulateUsersExecution(List<Task> tasks, int usrCount, int delay, int executionMilliseconds, HttpRequests client, string uri)
        {
            //copy the list
            var tasksPool = new List<Task>(tasks);
            Stopwatch stopwatch = Stopwatch.StartNew();
            for (int i = 0; i < usrCount; i++)
            {
                //await Task.Run(() => tasks[i].Start());
                tasksPool[i].Start();
                
            }
            while (stopwatch.ElapsedMilliseconds < executionMilliseconds)
            {
                var tasksPoolLoop = tasks;
                foreach(var task in tasks)
                {
                    int index = tasks.IndexOf(task);
                    if (tasksPool[index].Status == TaskStatus.RanToCompletion)
                    {
                        Task t = new Task(() => Console.WriteLine());
                        //t = tasks[i];
                        tasksPool[index] = task.ContinueWith((tsk) => {
                            tsk = GiveUserTask(client, uri);
                            Thread.Sleep(delay);
                            tsk.Start();

                        }, TaskContinuationOptions.AttachedToParent);
                        //tasksPool[i].Start();
                    }
                    
                }
            }
            stopwatch.Stop();

            
            Task.WaitAll(tasksPool.ToArray());
            for (int i = 0; i < usrCount; i++)
            {
                if (tasks[i].IsCanceled || tasks[i].IsFaulted)
                    taskinfo.Add(i, tasks[i].Status.ToString());
            }
        }

        public static Task GiveUserTask(HttpRequests client, string uri)
        {

            Task t = new Task(async () =>
            {
                PerfData pd = new PerfData();
                Stopwatch sw = new Stopwatch();
                sw.Start();
                pd.Order = (int)Task.CurrentId;
                pd.StatucCode = await client.GetAsyncStatucCode(uri);
                sw.Stop();
                pd.RequestCompletionTime = sw.ElapsedMilliseconds;
                lock (_locker)
                {
                    perfData.Add(pd);
                }
            });
            return t;

        }

    }
}
