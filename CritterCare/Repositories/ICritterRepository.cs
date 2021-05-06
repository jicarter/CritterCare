using System.Collections.Generic;
using CritterCare.Models;


namespace CritterCare.Repositories
{
    public interface ICritterRepository
    {
        void AddCritter(Critter critter);
        void DeleteCritter(int Id);
        List<Critter> GetAllCritters();
        Critter GetCritterById(int id);
        void UpdateCritter(Critter critter);
    }
}
