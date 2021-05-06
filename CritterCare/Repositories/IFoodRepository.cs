using CritterCare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Repositories
{
    public interface IFoodRepository
    {
        void AddFood(Food food);
        void DeleteFood(int Id);
        List<Food> GetAllFood();
        Food GetFoodById(int id);
        List<Food> GetFoodByUserProfileId(int UserProfileId);
        void UpdateFood(Food food);
    }
}
