using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Models
{
    public class Expenses
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Store { get; set; }
        public string Receipt { get; set; }
        public int CategoryId { get; set; }
        public int UserProfileId { get; set; }
    }
}
