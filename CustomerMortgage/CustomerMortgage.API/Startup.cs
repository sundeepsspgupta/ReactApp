using CustomerMortgage.ConfigItems;
using CustomerMortgage.ConfigItems.Repository;
using CustomerMortgage.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Redis;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

namespace CustomerMortgage.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            _config = configuration;
        }

        public IConfiguration _config { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlServer(_config.GetConnectionString("MortgageDB"));
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo 
                { 
                    Title = "CustomerMortgage.API", 
                    Version = "v1",
                    Description = "Create customer related Mortgage",
                    Contact = new OpenApiContact
                    {
                        Name = "Sundeep Gupta",
                        Email = ""
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Sundeep Gupta"
                    }
                });
            });
            
            services.AddDistributedRedisCache(options =>
            {
                options.Configuration = !string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("ENV_VAR_REDIS_CACHE_HOST_DETAIL")) ? 
                Environment.GetEnvironmentVariable("ENV_VAR_REDIS_CACHE_HOST_DETAIL") : _config.GetValue<string>("RedisCache:HostDetail");
            });
            services.AddSingleton<IEnvironmentVariables, EnvironmentVariables>();
            services.AddSingleton<IDistributedCache, RedisCache>();
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CustomerMortgage.API v1"));
            }
            app.UseCors(options => 
                options.WithOrigins("http://localhost:3002")
                .AllowAnyHeader()
                .AllowAnyMethod()
            );
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
