namespace movie_ticket_booking.Models.DTO
{
    public class SeatNumber
    {
        public int row { get; set; }
        public int number { get; set; }
    }
    public class BookingDTO
    {
        public long showTimeId { get; set; }
        public List<SeatNumber> seatNumber { get; set; }
        public DateTime bookingDate { get; set; }
    }
}
