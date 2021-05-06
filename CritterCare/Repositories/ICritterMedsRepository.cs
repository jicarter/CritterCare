using CritterCare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Repositories
{
    public interface ICritterMedsRepository
    {
        void DeleteCritterMeds(int id);
        List<CritterMeds> GetMedsByCritterId(int CritterId);
        void InsertMedicine(CritterMeds CritterMeds);
    }
}
