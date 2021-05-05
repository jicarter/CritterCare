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
    public class UserProfileController : Controller
    {


        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            var profile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

            return Ok(profile);
        }

        [HttpPost]
        public IActionResult Post(UserProfile user)
        {
            user.CreateDateTime = DateTime.Now;
            _userProfileRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }

        [HttpGet("GetAllProfiles")]
        public IActionResult Get()
        {
            var profiles = _userProfileRepository.GetUserProfiles();
            return Ok(profiles);
        }

        [HttpGet("GetUserById/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetUserProfileById(id));
        }
    }   
}
