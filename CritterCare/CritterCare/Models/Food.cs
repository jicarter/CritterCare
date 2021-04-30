using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Models
{
    public class Food
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Details { get; set; }
        public int UserId { get; set; }

    }
}
