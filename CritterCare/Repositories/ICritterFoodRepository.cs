using CritterCare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Repositories
{
    public interface ICritterFoodRepository
    {
        void AddFood(CritterFood CritterFood);
        void DeleteCritterFood(int id);
        List<CritterFood> GetMedsByCritterId(int CritterId);
    }
}
