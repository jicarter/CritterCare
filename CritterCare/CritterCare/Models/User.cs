using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public DateTime CreateDateTime { get; set; }
    }
}
