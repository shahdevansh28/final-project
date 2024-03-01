import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Seat from "./Seat";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Session from "react-session-api";

export default function SeatLayout() {
  const [details, setDetail] = useState([]);
  const [seatData, setSeatData] = useState([]);

  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("showId");
  Session.set("showTimeId", id);

  useEffect(() => {
    axios
      .get(`https://localhost:44397/api/Seat/seat-layout?showTimeId=${id}`)
      .then((response) => {
        console.log(response.data);
        setDetail(response.data);
      });
  }, []);

  const sendData = (seat) => {
    console.log(seat.data.row);
    var obj = {
      row: seat.data.row,
      number: seat.data.number,
    };
    setSeatData([...seatData, obj]);
  };

  console.log(seatData);
  const defaultTheme = createTheme();

  const onClick = () => {
    Session.set("seatNumber", seatData);
    console.log(seatData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container>
          {details.map((detail) => (
            <>
              <Grid xs={12} sm={6} md={4}>
                <Seat data={detail} sendData={sendData} />
              </Grid>
            </>
          ))}
        </Grid>
        <Link to="/confirm-booking">
          <Button
            variant="contained"
            fullWidth="true"
            color="primary"
            onClick={onClick}
          >
            Book Now
          </Button>
        </Link>
      </Container>
    </ThemeProvider>
  );
}
