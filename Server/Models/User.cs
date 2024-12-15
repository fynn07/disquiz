using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class User
    {
        [Key]
        public int Id {get; set; }

        [Required]
        public string Email {get; set; } = string.Empty;

        [Required]
        public string PasswordHash {get; set; } = string.Empty;

        [Required]
        public string FirstName {get; set; } = string.Empty;

        [Required]
        public string LastName {get; set; } = string.Empty;
    }
}