using AutoMapper;
using CarStore.Core;
using CarStore.Core.DTO;
using CarStore.Core.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService userService;
        private readonly IMapper mapper;

        public UserController(IUserService _userService, IMapper _mapper)
        {
            userService = _userService;
            mapper = _mapper;
        }

        // GET: api/<UserController>
        [HttpGet]
        public ActionResult<IEnumerable<UserDTO>> GetAll()
        {
            List<UserDTO> list = mapper.Map<List<UserDTO>>(userService.GetAll());
            if (list == null)
                return NotFound();
            return Ok(list);
        }

        // GET api/<UserController>/5
        [HttpGet("id{id}")]
        public ActionResult<UserDTO> GetById(int id)
        {
            UserDTO u = mapper.Map<UserDTO>(userService.GetById(id));
            if (u == null)
                return NotFound(id);
            return Ok(u);
        }

        [HttpGet("nameandpassword")]
        public ActionResult<UserDTO> GetByNameAndPass(string name, string password)
        {
            UserDTO u = mapper.Map<UserDTO>(userService.GetByNameAndPass(name, password));
            if(u == null)
                return NotFound(name + ' ' + password);
            return Ok(u);
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post(UserDTO udto)
        {
            User user = mapper.Map<User>(udto);
            userService.AddUser(user);
        }

        // PUT api/<UserController>/5
        [HttpPut("update")]
        public void Put(UserDTO udto)
        {
            User user = mapper.Map<User>(udto);
            userService.UpdateUser(user);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            userService.DeleteUser(id);
        }
    }
}
