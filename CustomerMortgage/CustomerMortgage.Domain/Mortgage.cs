using System.ComponentModel.DataAnnotations.Schema;

namespace CustomerMortgage.Domain
{
    public class Mortgage
    {
        public int Id { get; set; }
        
        
        public int CustomerId { get; set; }
        
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }
        public string MortgageType { get; set; }
        public string MortgageAmount { get; set; }
        public string PaymentType { get; set; }
    }
}
