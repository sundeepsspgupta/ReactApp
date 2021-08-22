using CustomerMortgage.ConfigItems;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Exceptions;
using Serilog.Formatting.Compact;
using System;

namespace CustomerMortgage.Logger
{
    public class ConfigureLogger
    {
        public static void InitializeLogSettings()
        {
            var _environmentVariables = new EnvironmentVariables();

            var configuration = new ConfigurationBuilder().
                AddJsonFile($"appsettings.json", optional: false, reloadOnChange: true)
                .Build();
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .Enrich.WithExceptionDetails()
                .Enrich.WithMachineName()
                .Enrich.WithCaller()
                //.WriteTo.Console(new RenderedCompactJsonFormatter())
                .WriteTo.File(new RenderedCompactJsonFormatter(), @"Log-.txt", rollingInterval: RollingInterval.Hour)
                .Enrich.WithProperty("Environment", _environmentVariables.TargetEnvironment)
                .ReadFrom.Configuration(configuration)
                .MinimumLevel.ControlledBy(new EnvironmentVariableLoggingLevelSwitch(_environmentVariables.MinimumLoggingLevel))
                .CreateLogger();
        }
    }

    public class EnvironmentVariableLoggingLevelSwitch : LoggingLevelSwitch
    {
        public EnvironmentVariableLoggingLevelSwitch(string environmentVariable)
        {
            LogEventLevel level = LogEventLevel.Information;
            if(Enum.TryParse<LogEventLevel>(Environment.ExpandEnvironmentVariables(environmentVariable),true,out level))
            {
                MinimumLevel = level;
            }
        }
    }
}
