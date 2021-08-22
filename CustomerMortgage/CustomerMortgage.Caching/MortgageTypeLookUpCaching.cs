using CustomerMortgage.ConfigItems.Repository;
using CustomerMortgage.Domain;
using CustomerMortgage.Logger;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CustomerMortgage.Caching
{
    public class MortgageTypeLookUpCaching
    {
        private readonly IEnvironmentVariables _environmentVariables;
        private readonly IDistributedCache _distributedCache;
        public MortgageTypeLookUpCaching(IEnvironmentVariables environmentVariables,IDistributedCache distributedCache)
        {
            _environmentVariables = environmentVariables;
            _distributedCache = distributedCache;
        }

        public async Task<List<MortgageTypeLookUp>> GetMortgageTypeLookUpFromCache()
        {
            ApplicaitonLogger.Debug("Method Entry");
            List<MortgageTypeLookUp> mortgageTypeLookUp = null;
            try
            {
                var mortgageTypeLookUpData = await _distributedCache.GetAsync(CacheKeys.MORTGAGETYPELOOKUP_CACHE_KEY);
                if (mortgageTypeLookUpData != null)
                {
                    mortgageTypeLookUp = JsonConvert.DeserializeObject<List<MortgageTypeLookUp>>(Encoding.UTF8.GetString(mortgageTypeLookUpData));
                }
            }
            catch (Exception ex)
            {
                ApplicaitonLogger.Error(ex, "Error occured while getting cache data");
                throw;
            }
            finally
            {
                ApplicaitonLogger.Debug("Method Exit");
            }
            return mortgageTypeLookUp;
        }

        public async Task StoreMortgageTypeLookUpToCache(List<MortgageTypeLookUp> mortgageTypeLookUp)
        {
            // logging
            try
            {
                //byte[] mortgageTypeLookUpData = ByteArrayConverter.ObjectToByteArray(mortgageTypeLookUp);
                string serializedMTL = JsonConvert.SerializeObject(mortgageTypeLookUp);
                var encodedMortgageTypeLookUpData = Encoding.UTF8.GetBytes(serializedMTL);

                var expirationDuration = _environmentVariables.RedisCacheExpirationDuration;
                var distributedCacheEntryOptions = new DistributedCacheEntryOptions().
                    SetSlidingExpiration(TimeSpan.FromSeconds(Convert.ToDouble(expirationDuration)));
                await _distributedCache.SetAsync(CacheKeys.MORTGAGETYPELOOKUP_CACHE_KEY, encodedMortgageTypeLookUpData, distributedCacheEntryOptions);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
