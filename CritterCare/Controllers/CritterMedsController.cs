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
    public class CritterMedsController : ControllerBase
    {
        private readonly ICritterMedsRepository _CritterMedsRepository;
        public CritterMedsController(ICritterMedsRepository critterMedsRepository)
        {
            _CritterMedsRepository = critterMedsRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var critterMeds = _CritterMedsRepository.GetMedsByCritterId(id);
            if (critterMeds == null)
            {
                return NotFound();
            }

            return Ok(critterMeds);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _CritterMedsRepository.DeleteCritterMeds(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult CritterMeds(CritterMeds critterMeds)
        {
            _CritterMedsRepository.InsertMedicine(critterMeds);
            return NoContent();
        }
    }
}
