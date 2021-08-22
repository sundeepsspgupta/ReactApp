using CustomerMortgage.Logger;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Reflection;

namespace CustomerMortgage.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            ConfigureLogger.InitializeLogSettings();
            try
            {
                ApplicaitonLogger.Information("MortgageService API started");
                
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Log.Fatal($"Failed to start {Assembly.GetExecutingAssembly().GetName().Name}",ex);
                throw;
            }
            
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                }).ConfigureAppConfiguration(configuration => {
                    configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
                }).UseSerilog();
    }
}
