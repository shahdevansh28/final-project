import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Component/SignUp";
import MovieList from "./Component/MovieList";
import ShowList from "./Component/ShowList";
import SeatLayout from "./Component/SeatLayout";
import ConfirmationPage from "./Component/ConfirmationPage";
import SignIn from "./Component/SignIn";
import HomePage from "./Component/HomePage";
import NavBar from "./Component/NavBar";
import AdminPage from "./Component/Admin/AdminPage";
import Theater from "./Component/Theater/Theater";
import AdminMainContent from "./Component/Admin/AdminMainContent";
import HomePageCarousel from "./Component/HomePageCarousel";
import AdminSidePannel from "./Component/Admin/AdminSidePannel";
import Movie from "./Component/Movie/Movie";
import ShowTime from "./Component/ShowTime/ShowTime";
import SeatLayoutAdmin from "./Component/SeatLayout/SeatLayoutAdmin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="theaters" element={<MovieList />} />
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
          <Route path="showlist" element={<ShowList />} />
          <Route path="seatLayout" element={<SeatLayout />} />
          <Route path="confirm-booking" element={<ConfirmationPage />} />

          <Route path="admin" element={<AdminPage />}>
            <Route index element={<AdminMainContent />}/>
            <Route path="Theater" element={<Theater />} />
            <Route path="Movies" element={<Movie/>} />
            <Route path="ShowTime" element={<ShowTime/>} />
            <Route path="SeatLayout" element={<SeatLayoutAdmin/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
