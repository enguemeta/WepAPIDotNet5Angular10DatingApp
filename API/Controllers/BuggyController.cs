using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : ApiBaseController
    {
        private readonly DataContext _dataContext;
        public BuggyController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret() {
              return "secret text";
        }

         [HttpGet("not-found")]
        public ActionResult<string> GetNotFound() {
              var thing = _dataContext.Users.Find(-1);
              if(thing == null) return NotFound();
              return Ok(thing);
        }

        [HttpGet("register")]
        public ActionResult<string> GetValidation(RegisterDto register) {
              var thing = _dataContext.Users.Find(-1);
              if(thing == null) return NotFound();
              return Ok(thing);
        }

         [HttpGet("server-error")]
        public ActionResult<string> GetServerError() {
           var thing = _dataContext.Users.Find(-1);
           var t = thing.ToString();
           return t;
        }

         [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest() {
              return BadRequest("This was not a good request");
        }

    }
}