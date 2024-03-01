import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  TextField,
  FormControlLabel,
  Grid,
  Checkbox,
} from "@mui/material";

export default function Movie() {
  const [detail, setDetail] = useState([]);
  const [movieData, setMovieData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(dayjs(Date.now()));

  const d = date.$y + "-" + (date.$M + 1) + "-" + date.$D;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  let name, value;
  const onChangeInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMovieData({ ...movieData, [name]: value });
  };

  const addMovie = async (e) => {
    try {
      const res = await axios.post("https://localhost:44397/api/Movie", {
        title: movieData.movieName,
        release_Date: new Date(date).toISOString(),
        duration: movieData.duration,
      });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    console.log(movieData);
  };
  const discardMovie = (e) => {};

  useEffect(() => {
    axios.get("https://localhost:44397/api/Movie").then((response) => {
      console.log(response.data);
      setDetail(response.data);
    });
  }, []);


  console.log(new Date(date).toISOString());


  const setData = (data) => {
    console.log(data);
    let { id, name, description } = data;
  };
  const getData = () => {
    axios.get("https://localhost:44397/api/Movie").then((getData) => {
      setDetail(getData.data);
    });
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`https://localhost:44397/api/Movie/${id}`).then(() => {
        getData();
      });
    }
  };
  console.log(detail.forEach((data) => console.log(data.id)));
  return (
    <div sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <h3>Movies</h3>

      <Button variant="outlined" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Fill Info Correctly"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="movieName"
              label="Movie Name"
              name="movieName"
              autoComplete="movieName"
              value={movieData.theaterName}
              onChange={onChangeInput}
              autoFocus
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                required
                fullWidth
                label="Select Release-Date"
                value={date}
                minDate={dayjs()}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>

            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              id="duration"
              label="Duration (in mins)"
              name="duration"
              autoComplete="duration"
              value={movieData.duration}
              onChange={onChangeInput}
              autoFocus
            />

            <Button
              onClick={addMovie}
              id="submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Add Movie
            </Button>

            <Button
              onClick={discardMovie}
              id="submit"
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Discard
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detail.map((data) => {
            return (
              <TableRow>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>
                  {console.log(new Date(data.release_date))}
                </TableCell>
                <TableCell>{data.duration} Mins</TableCell>
                <Link to="/department/update">
                  <TableCell>
                    <Button onClick={() => setData(data)}>update</Button>
                  </TableCell>
                </Link>
                <TableCell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
