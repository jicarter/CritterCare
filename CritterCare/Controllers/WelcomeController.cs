using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CritterCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WelcomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Welcome()
        {
            return Content("Welcome");
        }

        [Authorize]
        [HttpGet("auth")]
        public IActionResult WelcomeAuth()
        {
            return Content("Welcome from an endpoint that requires auth");
        }
    }
}
