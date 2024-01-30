import logo from "./logo.svg";
import "./App.css";

import { Switch, Route, Routes, BrowserRouter } from "react-router-dom";
import SignUp from "./Component/SignUp";
import MovieList from "./Component/MovieList";
import ShowList from "./Component/ShowList";
import SeatLayout from "./Component/SeatLayout";
import ConfirmationPage from "./Component/ConfirmationPage";
import Demo from "./Component/Demo";
import SignIn from "./Component/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/showList" element={<ShowList />} />
        <Route path="/setLayout" element={<SeatLayout />} />
        <Route path="/confirm-booking" element={<ConfirmationPage />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
      
    </>
  );
}

export default App;
