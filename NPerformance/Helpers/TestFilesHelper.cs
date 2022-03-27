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
        public static  PerfModel ReadTestFile()
        {
            string path = Directory.GetCurrentDirectory();
            path = Directory.GetParent(path).Parent.Parent.FullName;
            string text = File.ReadAllText(path + "\\TestModel.json");
            PerfModel requestSequenceCollection = JsonConvert.DeserializeObject<PerfModel>(text);
            return requestSequenceCollection;
        }

        public static PerfModel ReadTestFile(string filepath)
        {
            string text = File.ReadAllText(filepath + "\\TestModel.json");
            PerfModel requestSequenceCollection = JsonConvert.DeserializeObject<PerfModel>(text);
            return requestSequenceCollection;
        }
    }
}
