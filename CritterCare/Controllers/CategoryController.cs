using CritterCare.Models;
using CritterCare.Repositories;
using Microsoft.AspNetCore.Authorization;
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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet("GetAllCategories")]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAllCategories());
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.DeleteCategory(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Category(Category category)
        {
            _categoryRepository.AddCategory(category);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            _categoryRepository.UpdateCategory(category);
            return NoContent();
        }
    }
}

