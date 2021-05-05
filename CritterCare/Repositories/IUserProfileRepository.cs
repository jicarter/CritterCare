using CritterCare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile UserProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserProfileById(int id);
        List<UserProfile> GetUserProfiles();
    }
}
