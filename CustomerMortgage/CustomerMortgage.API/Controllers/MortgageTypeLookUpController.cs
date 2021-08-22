using CustomerMortgage.Caching;
using CustomerMortgage.ConfigItems.Repository;
using CustomerMortgage.Domain;
using CustomerMortgage.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomerMortgage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MortgageTypeLookUpController : Controller
    {
        private readonly DataContext _dataContext;
        private readonly IEnvironmentVariables _environmentVariables;
        private readonly IDistributedCache _distributedCache;
        public MortgageTypeLookUpController(DataContext dataContext, IEnvironmentVariables environmentVariables, IDistributedCache distributedCache)
        {
            _dataContext = dataContext;
            _environmentVariables = environmentVariables;
            _distributedCache = distributedCache;
        }

        [HttpGet]
        public async Task<IActionResult> GetMortgageTypeLookUpAsync()
        {
            var mortgageTypeLookUpCaching = new MortgageTypeLookUpCaching(_environmentVariables, _distributedCache);
            List<MortgageTypeLookUp> mortgageTypeLookUp = await mortgageTypeLookUpCaching.GetMortgageTypeLookUpFromCache();
            if (mortgageTypeLookUp != null)
            {
                return Ok(mortgageTypeLookUp);
            }
            else
            {
                mortgageTypeLookUp = await _dataContext.MortgageTypeLookUp.ToListAsync();
                await mortgageTypeLookUpCaching.StoreMortgageTypeLookUpToCache(mortgageTypeLookUp);
                return Ok(mortgageTypeLookUp);
            }
        }
    }
}
