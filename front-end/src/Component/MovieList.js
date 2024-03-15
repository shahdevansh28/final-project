import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import MoviePost from "./MoviePost";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Margin } from "@mui/icons-material";

export default function MovieList() {
  const [details, setDetail] = useState([]);
  useEffect(() => {
    axios.get("https://localhost:44397/api/Movie").then((response) => {
      console.log(response.data);
      setDetail(response.data);
    });
  }, []);

  // const defaultTheme = createTheme({
  //   columnSpacing: 8,
  // });
  return (
    <>
      {/* <ThemeProvider theme={defaultTheme}> */}
      <Container>
        <Typography variant="h5">Movie List</Typography>
        <Grid container sx={{ my: 2 }} spacing={4}>
          {details.map((detail) => (
            <>
              <Grid item xs={3}>
                <MoviePost data={detail} />
              </Grid>
            </>
          ))}
        </Grid>
      </Container>
      {/* </ThemeProvider> */}
    </>
  );
}
