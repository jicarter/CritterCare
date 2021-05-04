using CritterCare.Models;
using CritterCare.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {


        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            var profile = _userRepository.GetByFirebaseUserId(firebaseUserId);

            return Ok(profile);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            user.CreateDateTime = DateTime.Now;
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var profiles = _userRepository.GetUsers();
            return Ok(profiles);
        }

        [HttpGet("GetUserById/{id}")]
        public IActionResult GetUserById(int id)
        {
            return Ok(_userRepository.GetUserById(id));
        }
    }   
}
