using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using static System.Net.WebRequestMethods;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarStore.Core;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogInController : ControllerBase
    {
        // GET: api/<LogInController>
        [HttpPost]
        public IActionResult Login([FromBody] LogIn logIn)
        {
            if (logIn.Name == "טובה" && logIn.Password == "11111111")
            {
                var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, "טובה"),
                new Claim(ClaimTypes.Role, "manager")
            };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SomeLongLongLongKeyToGenerateMyJwtToken"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:7059/",
                    audience: "https://localhost:7059/",
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            return Unauthorized();
        }


    }
}
