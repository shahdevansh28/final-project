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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MenuItem, Select, InputLabel } from "@mui/material";

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

export default function ShowTime() {
  const [detail, setDetail] = useState([]);
  const [showtimeData, setShowtimeData] = useState({});
  const [open, setOpen] = React.useState(false);

  const [showDate, setShowDate] = useState(dayjs(Date.now()));
  const [startTime, setStartTime] = useState(dayjs(Date.now()));
  const [endTime, setEndTime] = useState(dayjs(Date.now()));

  const [movieName, setMovieName] = useState([]);
  const [theaterName, setTheaterName] = useState([]);
  //   const d = date.$y + "-" + (date.$M + 1) + "-" + date.$D;

  useEffect(() => {
    axios.get("https://localhost:44397/api/Movie").then((response) => {
      setMovieName(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://localhost:44397/api/Theater").then((response) => {
      console.log(response.data);
      setTheaterName(response.data);
    });
  }, []);

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
    setShowtimeData({ ...showtimeData, [name]: value });
  };

  const addShowTime = async (e) => {
    try {
      const res = await axios.post("https://localhost:44397/api/ShowTime", {
        showDate: new Date(showDate).toISOString(),
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        amount: showtimeData.amount,
        capacity: showtimeData.capacity,
        movieId: showtimeData.movieId,
        theaterId: showtimeData.theaterId,
      });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    console.log(showtimeData);
  };
  const discardShowTime = (e) => {};

  useEffect(() => {
    axios.get("https://localhost:44397/api/ShowTime").then((response) => {
      console.log(response.data);
      setDetail(response.data);
    });
  }, []);

  console.log(new Date(showDate).toISOString());

  const setData = (data) => {
    console.log(data);
    let { id, name, description } = data;
  };
  const getData = () => {
    axios.get("https://localhost:44397/api/ShowTime").then((getData) => {
      setDetail(getData.data);
    });
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`https://localhost:44397/api/ShowTime/${id}`).then(() => {
        getData();
      });
    }
  };
  console.log(detail.forEach((data) => console.log(data.id)));
  return (
    <div sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <h3>Shows</h3>

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                required
                fullWidth
                name="showDate"
                label="Select Show Date"
                value={showDate}
                minDate={dayjs()}
                onChange={(newValue) => setShowDate(newValue)}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                name="startTime"
                label="Select Start-Time"
                value={startTime}
                minDate={dayjs()}
                onChange={(newValue) => setStartTime(newValue)}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                required
                name="endTime"
                fullWidth
                label="Select End-Time"
                value={endTime}
                minDate={dayjs()}
                sx={{ mt: 1 }}
                onChange={(newValue) => setEndTime(newValue)}
              />
            </LocalizationProvider>
            <TextField
              margin="normal"
              required
              fullWidth
              name="amount"
              label="Amount"
              type="number"
              value={showtimeData.location}
              onChange={onChangeInput}
              id="amount"
              autoComplete="amount"
            />
            <TextField
              margin="capacity"
              required
              fullWidth
              name="capacity"
              label="Capacity"
              type="number"
              value={showtimeData.location}
              onChange={onChangeInput}
              id="capacity"
              autoComplete="capacity"
            />

            <InputLabel id="movie-name">Select Movie</InputLabel>
            <Select
              required
              fullWidth
              style={{ width: "500px", margin: "5px" }}
              labelId="movie-name-select-label"
              id="movie-name-select"
              value={showtimeData.movieId}
              name="movieId"
              onChange={onChangeInput}
            >
              {movieName.map((data) => {
                return <MenuItem value={data.id}>{data.title}</MenuItem>;
              })}
            </Select>

            <InputLabel id="theater-name">Select Theater</InputLabel>
            <Select
              required
              fullWidth
              style={{ width: "500px", margin: "5px" }}
              labelId="theater-name-select-label"
              id="theater-name-select"
              value={showtimeData.theaterId}
              name="theaterId"
              onChange={onChangeInput}
            >
              {theaterName.map((data) => {
                return (
                  <MenuItem value={data.id}>
                    {data.name},{data.location}
                  </MenuItem>
                );
              })}
            </Select>

            <Button
              onClick={addShowTime}
              id="submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Add Movie
            </Button>

            <Button
              onClick={discardShowTime}
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
            <TableCell>Show-Id</TableCell>
            <TableCell>Movie-Name</TableCell>
            <TableCell>Theater</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Show-Date</TableCell>
            <TableCell>Start-Time</TableCell>
            <TableCell>End-Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detail.map((data) => {
            return (
              <TableRow>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.movieId}</TableCell>
                <TableCell>{data.theaterId}</TableCell>
                <TableCell>Rs. {data.amount}</TableCell>
                <TableCell>{data.capacity} Seats</TableCell>
                <TableCell>{new Date(data.showDate).toDateString()}</TableCell>
                <TableCell>
                  {new Date(data.startTime).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {new Date(data.endTime).toLocaleTimeString()}
                </TableCell>
                <Link to="/department/update">
                  <TableCell>
                    <Button onClick={() => setData(data)}>update</Button>
                  </TableCell>
                </Link>
                <TableCell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </TableCell>
                <Link to={`/admin/SeatLayout?showTimeId=${data.id}`}>
                  <TableCell>
                    <Button onClick={() => setData(data)}>View Seats</Button>
                  </TableCell>
                </Link>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
