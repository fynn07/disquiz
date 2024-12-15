using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class QuizQuestions
    {
        public int Id { get; set; }  // Unique identifier for the question
        public string Question { get; set; }  // The actual question
        public string Answer { get; set; }  // The answer (True/False in this case)
    }
}