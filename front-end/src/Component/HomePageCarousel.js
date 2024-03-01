import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Grid } from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

export default function HomePageCarousel(props) {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <Grid item xs={12}>
      <h1>Upcoming Movies</h1>
      <Carousel
        fullHeightHover={true}
        NextIcon={<ArrowForwardOutlinedIcon />}
        PrevIcon={<ArrowBackOutlinedIcon />}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Grid>
  );
}
function Item(props) {
  return (
    <Card sx={{ minWidth: 275, height: 500 }}>
      <CardContent>
        <h2>{props.item.name}</h2>
        <p>{props.item.description}</p>

        <Button className="CheckButton">Check it out!</Button>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
