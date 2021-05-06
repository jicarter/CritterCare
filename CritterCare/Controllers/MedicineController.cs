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
    public class MedicineController : ControllerBase
    {
        private readonly IMedicineRepository _MedicineRepository;
        public MedicineController(IMedicineRepository medicineRepository)
        {
            _MedicineRepository = medicineRepository;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var Medicines = _MedicineRepository.GetAllMeds();

            return Ok(Medicines);
        }



        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var Medicine = _MedicineRepository.GetMedicineById(id);


            return Ok(Medicine);

        }

        [HttpPost]
        public IActionResult Medicine(Medicine med)
        {

            _MedicineRepository.AddMedicine(med);
            return CreatedAtAction("Get", new { id = med.Id }, med);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Medicine med)
        {


            _MedicineRepository.UpdateMedicine(med);
            return NoContent();
        }

        [HttpGet("GetAllMedicinesByUserId")]
        public IActionResult GetAllMedicinesByUserId(int id)
        {
            var Medicines = _MedicineRepository.GetMedsByUserProfileId(id);
            return Ok(Medicines);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _MedicineRepository.DeleteMedicine(id);
            return NoContent();
        }
    }
}
