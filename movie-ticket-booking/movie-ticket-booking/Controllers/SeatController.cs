using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using movie_ticket_booking.Models;

namespace movie_ticket_booking.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public SeatController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seat>>> GetSeats()
        {
            if (_applicationDbContext.Seats == null)
            {
                return NotFound();
            }
            return await _applicationDbContext.Seats.ToListAsync();
        }
        [HttpGet]
        [ActionName("seat-layout")]
        public async Task<ActionResult<IEnumerable<Seat>>> GetSeatByShowTimeId(long showTimeId)
        {
            if(_applicationDbContext.Seats == null)
            {
                return NotFound();
            }

            return await _applicationDbContext.Seats.Where(e => e.ShowTimeId == showTimeId).ToListAsync();
        }

    }
}
