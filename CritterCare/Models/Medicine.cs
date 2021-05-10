using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Models
{
    public class Medicine
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Use { get; set; }
        public string Details { get; set; }
        public int UserProfileId { get; set; }
    }
}
