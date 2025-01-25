import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
export default function Format() {

  return (

    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}