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
    public class CritterController : ControllerBase
    {
        private readonly ICritterRepository _CritterRepository;
        public CritterController(ICritterRepository critterRepository)
        {
            _CritterRepository = critterRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_CritterRepository.GetAllCritters());
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var Critter = _CritterRepository.GetCritterById(id);
            if (Critter == null)
            {
                return NotFound();
            }

            return Ok(Critter);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _CritterRepository.DeleteCritter(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Critter(Critter Critter)
        {
            _CritterRepository.AddCritter(Critter);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Critter Critter)
        {
            _CritterRepository.UpdateCritter(Critter);
            return NoContent();
        }
    }
}
