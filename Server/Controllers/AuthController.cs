using Microsoft.AspNetCore.Mvc;
using PostgreSQL.Data;
using Server.Models;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public AuthController(ApplicationDBContext context)
        {
            _context = context;
        }

        // Register user
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto userDto)
        {
            // Check if username already exists
            if (await _context.Users.AnyAsync(u => u.Email == userDto.Email))
            {
                return BadRequest(new { error = "Email already exists." });
            }

            // Hash the password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            var user = new User
            {
                Email = userDto.Email,
                PasswordHash = passwordHash,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { id = user.Id, firstName = user.FirstName, lastName = user.LastName });
        }


        // Login user
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto userDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password.");
            }

            // Here you would typically generate a JWT token or some session ID
            // For simplicity, let's return a success message
            return Ok(user);
        }

        // Login user
        [HttpGet("user")]
        public async Task<IActionResult> getUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return Ok(user);
        }
    }

    // DTO to capture the user input for registration and login
    public class RegisterUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class LoginUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
