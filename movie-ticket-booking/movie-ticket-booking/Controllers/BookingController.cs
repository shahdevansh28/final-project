using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using movie_ticket_booking.Models;
using movie_ticket_booking.Models.DTO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace movie_ticket_booking.Controllers
{
   
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public BookingController(ApplicationDbContext applicationDbContext) 
        {
            _applicationDbContext = applicationDbContext;
        }

        [Authorize]
        [Route("api/get-all-booking")]
        [HttpGet]
        public async Task<ActionResult<List<Booking>>> GetAllBooking()
        {
            return await _applicationDbContext.Bookings.ToListAsync();
        }

        [Route("api/get-ticket")]
        [HttpGet]
        public async Task<ActionResult<Booking>> GetBookingTicket(int id)
        {
            return _applicationDbContext.Bookings.FirstOrDefault(x => x.Id == id);

        }

        [Authorize]
        [Route("api/getBookingByUser")]
        [HttpGet]
        public async Task<ActionResult<List<Booking>>> GetBookingByUser(string userId)
        {
            return await _applicationDbContext.Bookings.Where(x => x.UserId == userId).ToListAsync();
        }

        [Authorize]
        [Route("api/book-ticket")]
        [HttpPost]
        public async Task<ActionResult<Booking>> BookTicket(BookingDTO bookingDTO, string userId)
        {
            //Get All Seats based on current ShowTime
            var TotalAvailableSeats =_applicationDbContext.Seats.Where(x => x.ShowTimeId == bookingDTO.showTimeId);
            double totalPrice = 0;
            //Check Availablitly of seat based on provided row and number
            //if it is available than consider that seat
            //udapte seat database and mark IsAvailable prop as false for selected seat
            //add new booked ticket to Booking table
            //else show message "Seat is not Available"
            
            foreach (var seat in bookingDTO.seatNumber)
            {
                var selectedSeat = TotalAvailableSeats.Where(x => x.Row == seat.row && x.Number == seat.number).FirstOrDefault();
                if (selectedSeat.IsAvailable == true)
                {
                    selectedSeat.IsAvailable = false;
                    _applicationDbContext.Seats.Update(selectedSeat);

                    var bookedTicket = new Booking
                    {
                        BookingDate = DateTime.Now,
                        SeatId = TotalAvailableSeats.Where(x => x.Row == seat.row && x.Number == seat.number).FirstOrDefault().Id,
                        ShowTimeId = bookingDTO.showTimeId,
                        UserId = userId
                    };

                    _applicationDbContext.Bookings.Add(bookedTicket);
                    await _applicationDbContext.SaveChangesAsync();

                    
                }
                else
                {
                    return Ok("Seat is not available" + seat.row.ToString() + seat.number.ToString());
                }
            }
            return Ok("Seats are booked");
        }

    }
}
