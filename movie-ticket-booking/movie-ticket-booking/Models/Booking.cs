using System.ComponentModel.DataAnnotations;

namespace movie_ticket_booking.Models
{
    public class Booking
    {
        public long Id { get; set; }
        //public double TotalPrice { get; set; }
        [Required]
        public DateTime BookingDate { get; set; }
        public long? SeatId { get; set; }
        public Seat? Seat { get; set; }
        public long ShowTimeId { get; set; }
        public ShowTime? ShowTime { get; set; }
        public long UserId { get; set; }
        public virtual User? User { get; set; }
    }
}
