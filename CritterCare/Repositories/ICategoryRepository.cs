using CritterCare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Repositories
{
    interface ICategoryRepository
    {
        void AddCategory(Category category);
        void DeleteCategory(int id);
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
        void UpdateCategory(Category category);
    }
}
