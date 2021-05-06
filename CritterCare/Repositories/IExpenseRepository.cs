using CritterCare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Repositories
{
    public interface IExpenseRepository
    {
        void AddExpense(Expenses Expense);
        void DeleteExpense(int id);
        List<Expenses> GetAllExpenses();
        Expenses GetExpenseById(int id);
        List<Expenses> GetExpensesByUserProfileId(int UserProfileId);
        void UpdateExpense(Expenses Expense);
    }
}
