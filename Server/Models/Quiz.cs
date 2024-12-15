using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Quiz
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string QuizName { get; set; } = string.Empty;

        [Required]
        public string QuizDescription { get; set; } = string.Empty;

        [Required]
        public int QuizAuthorId { get; set; } 

        [Required]
        public User QuizAuthor { get; set; } 

        public List<QuizQuestions> QuizQuestions { get; set; }

        public Quiz()
        {
            QuizQuestions = new List<QuizQuestions>(); 
        }
    }
}