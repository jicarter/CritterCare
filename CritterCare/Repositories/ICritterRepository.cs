using System.Collections.Generic;
using CritterCare.Models;


namespace CritterCare.Repositories
{
    public interface ICritterRepository
    {
        int AddCritter(Critter critter);
        void DeleteCritter(int Id);
        List<Critter> GetAllUsersCritters(int userProfileId);
        Critter GetCritterById(int id);
        void UpdateCritter(Critter critter);
    }
}
