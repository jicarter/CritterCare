using CritterCare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Repositories
{
    public interface IMedicineRepository
    {
        void AddMedicine(Medicine Medicine);
        void DeleteMedicine(int id);
        List<Medicine> GetAllMeds();
        Medicine GetMedicineById(int id);
        List<Medicine> GetMedsByUserProfileId(int userId);
        void UpdateMedicine(Medicine Medicine);
    }
}
