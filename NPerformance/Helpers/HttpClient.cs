﻿using System;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Text;
using System.Net.Http.Headers;
using NPerformance.Models;

namespace NPerformance.Helpers
{
    public class HttpRequests
    {
        private string authType;
        private string authToken;
        private string baseAddress;
        private bool authCapable;
        private bool _initialized;
        public string Url 
        {
            get
            {
                if (_initialized)
                    return baseAddress;
                else
                    return null;
            }
        }

        public bool Initialized
        {
            get
            {
                if (authCapable)
                {
                    if (!string.IsNullOrWhiteSpace(authType) && !string.IsNullOrWhiteSpace(authToken) && !string.IsNullOrWhiteSpace(baseAddress))
                    {
                        _initialized = true;
                        return true;
                    }
                }
                else
                {
                    if (!string.IsNullOrWhiteSpace(baseAddress))
                    {
                        _initialized = true;
                        return true;
                    }
                }
                _initialized = false;
                return false;
            }
        }

        public bool IsAuth
        {
            get
            {
                return authCapable;
            }
        }

        public void InitializeClient(string aType, string aToken, string bAddress)
        {
            authType = aType;
            authToken = aToken;
            baseAddress = bAddress;
            authCapable = true;
        }

        public void InitializeClient(string bAddress)
        {
            authType = "";
            authToken = "";
            baseAddress = bAddress;
            authCapable = false;
        }

        public string GetBaseUrl()
        {
            return baseAddress;
        }

        public async Task<T> GetAsync<T>(string uri)
        {
            string responseString = string.Empty;
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseAddress);
                try
                {
                    client.BaseAddress = new Uri(baseAddress);
                    if (IsAuth)
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(authType, authToken);
                    }
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = await client.GetAsync(uri);
                    response.EnsureSuccessStatusCode();
                    responseString = await response.Content.ReadAsStringAsync();
                    // Above three lines can be replaced with new helper method below
                    // string responseBody = await client.GetStringAsync(uri);

                    //Console.WriteLine(responseString);
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");
                    Console.WriteLine("Message :{0} ", e.Message);
                }
            }

            T resp = JsonSerializer.Deserialize<T>(responseString);
            return resp;
        }

        public async Task<HttpStatusCode> GetAsyncStatucCode(string uri)
        {
            string responseString = string.Empty;
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseAddress);
                try
                {
                    client.BaseAddress = new Uri(baseAddress);
                    if (IsAuth)
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(authType, authToken);
                    }
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = await client.GetAsync(uri);
                    return response.StatusCode;
                    // Above three lines can be replaced with new helper method below
                    // string responseBody = await client.GetStringAsync(uri);

                    //Console.WriteLine(responseString);
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");
                    Console.WriteLine("Message :{0} ", e.Message);
                    return HttpStatusCode.FailedDependency;
                }
            }
        }

        public async Task<HttpStatusCode> PostAsyncStatucCode(string uri, string body)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(baseAddress);
                    if (IsAuth)
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(authType, authToken);
                    }

                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, uri);
                    request.Content = new StringContent(body, Encoding.UTF8, "application/json");//CONTENT-TYPE header

                    HttpResponseMessage response = await client.SendAsync(request);
                    return response.StatusCode;
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");
                    Console.WriteLine("Message :{0} ", e.Message);
                    return HttpStatusCode.FailedDependency;
                }
            }
        }

        public async Task<HttpStatusCode> HeadAsyncStatucCode(string uri)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(baseAddress);
                    if (IsAuth)
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(authType, authToken);
                    }

                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Head, uri);

                    HttpResponseMessage response = await client.SendAsync(request);
                    return response.StatusCode;
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");
                    Console.WriteLine("Message :{0} ", e.Message);
                    return HttpStatusCode.FailedDependency;
                }
            }
        }

        public async Task<T> GetAsync<T>(string uri, Dictionary<string, string> requestParams)
        {
            StringBuilder sbURL = new StringBuilder(uri);
            if (requestParams.Count > 0)
            {
                sbURL = sbURL.Append("?");
                foreach (KeyValuePair<string, string> param in requestParams)
                {
                    sbURL.Append(param.Key).Append("=").Append(param.Value).Append("&");
                }

                //remove last & char
                sbURL.Remove(sbURL.Length - 1, 1);
            }

            string responseString = string.Empty;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(baseAddress);
                    if (IsAuth)
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(authType, authToken);
                    }

                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = await client.GetAsync(sbURL.ToString());
                    response.EnsureSuccessStatusCode();
                    responseString = await response.Content.ReadAsStringAsync();
                    // Above three lines can be replaced with new helper method below
                    // string responseBody = await client.GetStringAsync(uri);

                    //Console.WriteLine(responseString);
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");
                    Console.WriteLine("Message :{0} ", e.Message);
                }
            }

            T resp = JsonSerializer.Deserialize<T>(responseString);
            return resp;
        }

        public async Task<T> PostAsync<T, V>(string uri, V obj)
        {
            string jsonString = JsonSerializer.Serialize<V>(obj);
            string responseString = string.Empty;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(baseAddress);
                    if (IsAuth)
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(authType, authToken);
                    }

                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, uri);
                    request.Content = new StringContent(jsonString, Encoding.UTF8, "application/json");//CONTENT-TYPE header

                    HttpResponseMessage response = await client.SendAsync(request);
                    response.EnsureSuccessStatusCode();
                    responseString = await response.Content.ReadAsStringAsync();
                    // Above three lines can be replaced with new helper method below
                    // string responseBody = await client.GetStringAsync(uri);

                    //Console.WriteLine(responseString);
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");
                    Console.WriteLine("Message :{0} ", e.Message);
                }
            }

            T resp = JsonSerializer.Deserialize<T>(responseString);
            return resp;
        }

        public static async Task<HttpStatusCode> SendRequestAndWaitResponse(HttpRequests client,Request req)
        {
            switch (req.Method)
            {
                case "POST":
                    return await client.PostAsyncStatucCode(req.Uri, req.Body);
                    break;
                case "GET":
                    return await client.GetAsyncStatucCode(req.Uri);
                    break;
                case "HEAD":
                    return await client.HeadAsyncStatucCode(req.Uri);
                    break;
            }
            return HttpStatusCode.Conflict;

        }
    }
}
