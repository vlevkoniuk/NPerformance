using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using NPerformance.Models;

namespace NPerformance.Helpers
{
    public static class TestFilesHelper
    {
        public static  List<RequestSequenceCollection> ReadTestFile()
        {
            string path = Directory.GetCurrentDirectory();
            path = Directory.GetParent(path).Parent.Parent.FullName;
            string text = File.ReadAllText(path + "\\TestModel.json");
            List<RequestSequenceCollection> requestSequenceCollection = JsonConvert.DeserializeObject<List<RequestSequenceCollection>>(text);
            return requestSequenceCollection;
        }

        public static List<RequestSequenceCollection> ReadTestFile(string filepath)
        {
            string text = File.ReadAllText(filepath + "\\TestModel.json");
            List<RequestSequenceCollection> requestSequenceCollection = JsonConvert.DeserializeObject<List<RequestSequenceCollection>>(text);
            return requestSequenceCollection;
        }
    }
}
