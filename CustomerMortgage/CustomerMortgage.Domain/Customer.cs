using System;

namespace CustomerMortgage.Domain
{
    public class Customer
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public int Smoker { get; set; }
    }
}
