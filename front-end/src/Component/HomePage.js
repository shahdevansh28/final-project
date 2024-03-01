import React from "react";
import NavBar from "./NavBar";
import HomePageCarousel from "./HomePageCarousel";
import MovieList from "./MovieList";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <HomePageCarousel />
      <MovieList />
      <Footer />
      <Outlet />
    </>
  );
}
