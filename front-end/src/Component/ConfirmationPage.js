import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import ShowList from "./ShowList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Session from "react-session-api";
import Cookies from "js-cookie";
import NavBar from "./NavBar";

export default function ConfirmationPage(props) {
  const [bookingDetails, setBookingDetails] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [response, setResponse] = useState("");
  const [movieData, setMovieData] = useState({});

  const id = Cookies.get("userId");

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${Cookies.get("token")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const showId = Session.get("showTimeId");
  useEffect(() => {
    axios
      .get(
        `https://localhost:44397/api/Movie/api/get-movieByshow?showTimeId=${showId}`
      )
      .then((response) => {
        setMovieData(response.data);
        console.log(movieData.id);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `https://localhost:44397/api/book-ticket?userId=${id}`,
        {
          showTimeId: Session.get("showTimeId"),
          seatNumber: Session.get("seatNumber"),
          bookingDate: Session.get("bookingDate"),
        }
      );
      setBookingDetails(res);
      console.log(res.data);

      if (res.data.status === 201) {
        window.alert("Seats are not available");
      } else if (res.data.status === 200) {
        console.log("Paymet request is started");

        //make payment request
        try {
          const paymentRes = await axios.post(
            `https://localhost:44397/intitae-payment?userId=${id}`,
            {
              totalAmount: res.data.totalAmount,
              transactionID: res.data.transactionID,
            }
          );
          console.log(paymentRes.data);
          setOrderDetails(paymentRes.data);

          if (paymentRes.data.status == "created") {
            console.log("Order created");
            var options = {
              key: "rzp_test_MVtbvvIPLifFCR",
              amount: paymentRes.data.amount,
              currency: "INR",
              name: orderDetails.userId,
              description: "Movie Ticket Booking",
              image: "https://example.com/your_logo",
              order_id: paymentRes.data.id,
              handler: function (response) {
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature);

                updatePaymentOnServer(
                  response.razorpay_payment_id,
                  response.razorpay_order_id,
                  "Paid",
                  res.data.selectedSeats,
                  paymentRes.data.bookingOrder
                );
                window.alert("Payment completed...!!!");
                //update status as completed and add booking details
                //call updateDataOnServer
              },
              prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999",
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
            });

            rzp1.open();
          }
        } catch (err) {
          if (err.status === 401) alert("Unautherized-" + err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updatePaymentOnServer = async (
    razorpayPaymentID,
    razorpayOrderID,
    status,
    bookedSeats,
    bookingOrder
  ) => {
    try {
      const res = await axios.post(
        `https://localhost:44397/api/updateOnServer`,
        {
          razorpay_payment_id: razorpayPaymentID,
          razorpay_order_id: razorpayOrderID,
          status: status,
          selectedSeats: bookedSeats,
          bookingOrder: bookingOrder,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card sx={{ height: "100%", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Movie Name :- {movieData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration :- {movieData.duration} mins <br />
            Date:-{Session.get("bookingDate")} <br />
            Selected Seats:-
            {Session.get("seatNumber").map((data) => {
              return (
                <Typography>
                  Row :- {data.row} Column :- {data.number}
                </Typography>
              );
            })}
          </Typography>
        </CardContent>
        <CardActions>
          <Link>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm Booking
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
