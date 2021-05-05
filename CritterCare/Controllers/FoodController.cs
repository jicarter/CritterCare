using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CritterCare.Models;
using CritterCare.Repositories;

namespace CritterCare.Controllers
{
    public class FoodController : Controller
    {
        private readonly IFoodRepository _foodRepository;
        public FoodController(IFoodRepository foodRepository)
        {
            _foodRepository = foodRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var food = _foodRepository.GetAllFood();

            return Ok(food);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var food = _foodRepository.GetFoodById(id);


            return Ok(food);

        }

        [HttpPost]
        public IActionResult Food(Food food)
        {

            _foodRepository.AddFood(food);
            return CreatedAtAction("Get", new { id = food.Id }, food);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Food food)
        {
            _foodRepository.UpdateFood(food);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _foodRepository.DeleteFood(id);
            return NoContent();
        }
    }
}
