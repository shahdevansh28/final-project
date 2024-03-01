import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Show from "./Show";
import { useSearchParams } from "react-router-dom";
import Session from "react-session-api";

export default function ShowList(props) {
  const [date, setDate] = React.useState(dayjs(Date.now()));
  const d = date.$y + "-" + (date.$M + 1) + "-" + date.$D;
  const [details, setDetail] = useState([]);

  const queryParameters = new URLSearchParams(window.location.search);

  try {
    useEffect(() => {
      axios
        .get(`https://localhost:44397/api/ShowTime/get-showtime-by-movie`, {
          params: {
            id: queryParameters.get("movieId"),
            date: d,
          },
        })
        .then((response) => {
          console.log(response.data);
          Session.set("bookingDate", d);
          console.log(Session.get("bookingDate"));
          setDetail(response.data);
        });
    }, [date, setDate]);
  } catch (err) {
    console.log(err);
  }

  const defaultTheme = createTheme();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
        />
      </LocalizationProvider>
      <ThemeProvider theme={defaultTheme}>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={8}>
            {details.map((details) => (
              <>
                <Grid xs={12} sm={6} md={4}>
                  <Show key={details.id} data={details} />
                </Grid>
              </>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
    // <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} cols = {3}>
    //   {details.map((detail,key) => {
    //     return <MoviePost data = {detail}/>;
    //   })}
    // </List>
  );
}
