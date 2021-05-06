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
    public class CritterFoodController : ControllerBase
    {
        private readonly ICritterFoodRepository _CritterFoodRepository;
        public CritterFoodController(ICritterFoodRepository CritterFoodRepository)
        {
            _CritterFoodRepository = CritterFoodRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var CritterFood = _CritterFoodRepository.GetMedsByCritterId(id);
            if (CritterFood == null)
            {
                return NotFound();
            }

            return Ok(CritterFood);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _CritterFoodRepository.DeleteCritterFood(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult CritterFood(CritterFood critterFood)
        {
            _CritterFoodRepository.AddFood(critterFood);
            return NoContent();
        }
    }
}
