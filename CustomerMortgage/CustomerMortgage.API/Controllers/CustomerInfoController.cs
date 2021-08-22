using CustomerMortgage.Domain;
using CustomerMortgage.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerMortgage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerInfoController : Controller
    {
        private readonly DataContext _dataContext;
        public CustomerInfoController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomerAsync()
        {
            return Ok(await _dataContext.Customer.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerDetailsAsync(int Id)
        {
            return Ok(await _dataContext.Customer.FindAsync(Id));
        }

        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _dataContext.Customer.Add(customer);
            await _dataContext.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.ID }, customer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            customer.ID = id;

            _dataContext.Entry(customer).State = EntityState.Modified;

            try
            {
                await _dataContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dataContext.Customer.Any(e => e.ID == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }
    }
}
