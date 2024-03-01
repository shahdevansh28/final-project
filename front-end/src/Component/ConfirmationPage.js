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
import { useState } from "react";
import Session from "react-session-api";
import Cookies from "js-cookie";

export default function ConfirmationPage(props) {
  const [details, setDetails] = useState("");
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

  console.log(Session);
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
      setDetails(res);
      console.log(res);
      if (res.statusCode === 200) {
        alert(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card sx={{ height: "100%", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2"></Typography>
          <Typography>
            <CalendarMonthIcon fontSize="small" />

            <br />
            <AccessTimeIcon fontSize="small" />
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
              Confirm
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
