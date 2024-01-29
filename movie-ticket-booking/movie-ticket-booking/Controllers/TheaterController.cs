using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using movie_ticket_booking.Models;
using movie_ticket_booking.Models.DTO;

namespace movie_ticket_booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheaterController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public TheaterController(ApplicationDbContext applicationDbContext) 
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Theater>>> GetTheaters()
        {
            if (_applicationDbContext.Theaters == null)
            {
                return NotFound();
            }
            return await _applicationDbContext.Theaters.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Theater>> GetTheater(long id)
        {
            if (_applicationDbContext.Theaters == null)
            {
                return NotFound();
            }
            var theater = _applicationDbContext.Theaters.Find(id);
            if (theater == null)
            {
                return NotFound();
            }
            return theater;
        }

        [HttpPost]
        public async Task<ActionResult<Theater>> PostTheater(Theater theater)
        {
            if (_applicationDbContext.Theaters == null)
            {
                return NotFound();
            }
            _applicationDbContext.Add(theater);
            await _applicationDbContext.SaveChangesAsync();

            return CreatedAtAction("GetTheater", new { id = theater.Id }, theater);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTheater(long id, Theater theater)
        {
            if (id != theater.Id)
            {
                return BadRequest();
            }

            _applicationDbContext.Entry(theater).State = EntityState.Modified;

            try
            {
                await _applicationDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheaterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTheater(long id)
        {
            if (_applicationDbContext.Theaters == null)
            {
                return NotFound();
            }
            var theater = await _applicationDbContext.Theaters.FindAsync(id);
            if (theater == null)
            {
                return NotFound();
            }

            _applicationDbContext.Theaters.Remove(theater);
            await _applicationDbContext.SaveChangesAsync();

            return NoContent();
        }
        private bool TheaterExists(long id)
        {
            return (_applicationDbContext.Theaters?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
