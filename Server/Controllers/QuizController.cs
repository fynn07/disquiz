using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models; // Replace with your actual namespace for models
using PostgreSQL.Data; // Replace with your actual namespace for data context

namespace Server.Controllers
{
    [Route("api/quiz")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public QuizController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpPost("postQuiz")]
        public async Task<IActionResult> PostQuiz([FromBody] QuizDto quizDto)
        {
            if (quizDto == null || string.IsNullOrEmpty(quizDto.QuizName) || string.IsNullOrEmpty(quizDto.QuizDescription))
            {
                return BadRequest("Invalid quiz data.");
            }

            // Create a new Quiz object
            var quiz = new Quiz
            {
                QuizName = quizDto.QuizName,
                QuizDescription = quizDto.QuizDescription,
                QuizAuthorId = quizDto.QuizAuthorId,
                QuizQuestions = quizDto.QuizQuestions.Select(q => new QuizQuestions
                {
                    Question = q.Question,
                    Answer = q.Answer
                }).ToList()
            };

            try
            {
                // Save the quiz to the database
                _context.Quizzes.Add(quiz);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetQuizById), new { id = quiz.Id }, quiz);
            }
            catch (Exception ex)
            {
                // Handle any exceptions
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Additional method for fetching a quiz by ID (used in CreatedAtAction)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuizById(int id)
        {
            var quiz = await _context.Quizzes
                .Include(q => q.QuizQuestions)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quiz == null)
            {
                return NotFound();
            }

            return Ok(quiz);
        }

                // Endpoint to get all quizzes
        [HttpGet("getAllQuizzes")]
        public async Task<IActionResult> GetAllQuizzes()
        {
            try
            {
                var quizzes = await _context.Quizzes
                    .Include(q => q.QuizQuestions)
                    .ToListAsync();

                return Ok(quizzes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

    // DTO for receiving quiz data from the client
    public class QuizDto
    {
        public string QuizName { get; set; }
        public string QuizDescription { get; set; }
        public int QuizAuthorId { get; set; }  // User ID of the author
        public List<QuizQuestionDto> QuizQuestions { get; set; } = new();
    }

    public class QuizQuestionDto
    {
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
