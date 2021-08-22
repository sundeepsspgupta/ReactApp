using Serilog;
using System;

namespace CustomerMortgage.Logger
{
    public class ApplicaitonLogger
    {
        public static void Debug(string messageTemplage,params object[] propertyValues)
        {
            Log.Debug(messageTemplage, propertyValues);
        }

        public static void Information(string messageTemplage, params object[] propertyValues)
        {
            Log.Information(messageTemplage, propertyValues);
        }

        public static void Error(string messageTemplage, params object[] propertyValues)
        {
            Log.Error(messageTemplage, propertyValues);
        }

        public static void Error(Exception ex, string messageTemplage)
        {
            Log.Error(ex,messageTemplage);
        }

        public static void Error(Exception ex, string messageTemplage, params object[] propertyValues)
        {
            Log.Error(ex,messageTemplage, propertyValues);
        }
    }
}
