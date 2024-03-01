import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Show(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data[0].theater.name}
        </Typography>
        {props.data.map((data) => (
          <>
            <Typography variant="body2" color="text.secondary">
              <Link to={`/seatLayout?showId=${data.id}`}>
                <Button variant="outlined" sx={{ mt: 3, mb: 2 }}>
                  {new Date(data.startTime).toLocaleTimeString()}
                </Button>
              </Link>
            </Typography>
          </>
        ))}
        <Typography variant="body2" color="text.secondary">
          {/* {props.data} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
