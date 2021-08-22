using System.ComponentModel.DataAnnotations;

namespace CustomerMortgage.Domain
{
    public class MortgageTypeLookUp
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
