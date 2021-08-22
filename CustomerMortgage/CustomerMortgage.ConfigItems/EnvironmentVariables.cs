using CustomerMortgage.ConfigItems.Repository;
using System;

namespace CustomerMortgage.ConfigItems
{
    public class EnvironmentVariables : IEnvironmentVariables
    {
        public string RedisCacheHostDetails => Environment.GetEnvironmentVariable("ENV_VAR_REDIS_CACHE_HOST_DETAIL");

        public string RedisCacheExpirationDuration => Environment.GetEnvironmentVariable("ENV_VAR_REDIS_CACHE_EXPIRATION_DURATION");

        public string TargetEnvironment => Environment.GetEnvironmentVariable("ENV_VAR_TARGET_ENVIRONMENT");
        public string MinimumLoggingLevel => Environment.GetEnvironmentVariable("ENV_VAR_MINIMUM_LOGGING_LEVEL");

    }
}
