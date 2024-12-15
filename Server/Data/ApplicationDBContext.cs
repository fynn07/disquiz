using Microsoft.EntityFrameworkCore;
using Server.Models;
using Microsoft.Extensions.Configuration;

namespace PostgreSQL.Data
{
    public class ApplicationDBContext : DbContext
    {
        private readonly IConfiguration _configuration;

        // Constructor receives IConfiguration
        public ApplicationDBContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // Retrieve connection string from appsettings.json (using DefaultConnection)
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");
            }

            options.UseNpgsql(connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
    }
}
