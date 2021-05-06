using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Models
{
    public class Critter
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Breed { get; set; }
        public string Sex { get; set; }
        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ImageLocation { get; set; }
        public string Notes { get; set; }
        public int UserProfileId { get; set; }

    }
}
