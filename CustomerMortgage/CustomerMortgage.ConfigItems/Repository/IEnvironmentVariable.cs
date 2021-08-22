namespace CustomerMortgage.ConfigItems.Repository
{
    public interface IEnvironmentVariables
    {
        string RedisCacheHostDetails { get; }
        string RedisCacheExpirationDuration { get; }
        string TargetEnvironment { get; }
        string MinimumLoggingLevel { get; }

    }
}
