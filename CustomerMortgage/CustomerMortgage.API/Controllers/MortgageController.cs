using CustomerMortgage.Domain;
using CustomerMortgage.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CustomerMortgage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MortgageController : Controller
    {
        private readonly DataContext _dataContext;
        public MortgageController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetMortgageAsync()
        {
            return Ok(await _dataContext.Mortgage.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMortgageDetailsAsync(int Id)
        {
            return Ok(await _dataContext.Mortgage.FindAsync(Id));
        }

        [HttpPost]
        public async Task<ActionResult<Mortgage>> PostMortgage(Mortgage mortgage)
        {
            _dataContext.Mortgage.Add(mortgage);
            await _dataContext.SaveChangesAsync();

            return CreatedAtAction("GetMortgage", new { id = mortgage.Id }, mortgage);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Mortgage>> DeleteMortgage(int id)
        {
            var mortgage = await _dataContext.Mortgage.FindAsync(id);
            if (mortgage == null)
            {
                return NotFound();
            }

            _dataContext.Mortgage.Remove(mortgage);
            await _dataContext.SaveChangesAsync();

            return mortgage;
        }
    }
}
