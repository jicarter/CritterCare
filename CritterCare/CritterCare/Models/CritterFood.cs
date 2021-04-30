using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Models
{
    public class CritterFood
    {
        public int Id { get; set; }
        public string Notes { get; set; }
        public Boolean isCurrent { get; set; }
        public int CritterId { get; set; }
        public int FoodId { get; set; }
    }
}
