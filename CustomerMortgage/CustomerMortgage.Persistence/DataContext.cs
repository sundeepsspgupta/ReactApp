using CustomerMortgage.Domain;
using Microsoft.EntityFrameworkCore;

namespace CustomerMortgage.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Customer> Customer { get; set; }
        public DbSet<Mortgage> Mortgage { get; set; }

        public DbSet<MortgageTypeLookUp> MortgageTypeLookUp { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MortgageTypeLookUp>().HasData(
               new MortgageTypeLookUp
               {
                   Id = 1,
                   Name = "Mortgage1"
               },
               new MortgageTypeLookUp
               {
                   Id = 2,
                   Name = "Mortgage2"
               },
               new MortgageTypeLookUp
               {
                   Id = 3,
                   Name = "Mortgage3"
               },
               new MortgageTypeLookUp
               {
                   Id = 4,
                   Name = "Mortgage4"
               }
            );
        }
    }
}
