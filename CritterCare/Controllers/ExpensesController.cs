using CritterCare.Models;
using CritterCare.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseRepository _ExpensesRepository;
        public ExpensesController(IExpenseRepository ExpensesRepository)
        {
            _ExpensesRepository = ExpensesRepository;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var Expensess = _ExpensesRepository.GetAllExpenses();

            return Ok(Expensess);
        }



        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var Expenses = _ExpensesRepository.GetExpenseById(id);


            return Ok(Expenses);

        }

        [HttpPost]
        public IActionResult Expenses(Expenses Expense)
        {
            
            _ExpensesRepository.AddExpense(Expense);
            return CreatedAtAction("Get", new { id = Expense.Id }, Expense);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Expenses Expense)
        {
           

            _ExpensesRepository.UpdateExpense(Expense);
            return NoContent();
        }

        [HttpGet("GetAllExpensesByUserId")]
        public IActionResult GetAllExpensesByUserId(int id)
        {
            var Expenses = _ExpensesRepository.GetExpensesByUserProfileId(id);
            return Ok(Expenses);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _ExpensesRepository.DeleteExpense(id);
            return NoContent();
        }
    }
}
