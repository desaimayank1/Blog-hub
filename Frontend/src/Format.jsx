import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useUser } from "./context";
export default function Format() {
  // const { setUser } = useUser();
  // const getUser = async () => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/getuser`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: 'include',
  //     })
  //     const data = await response.json();
  //     if(data==false){
  //        window.location.href="/login"
  //     }
  //     
  //     setUser(data);
  //     //    console.log(data);
  //   } catch (error) {
  //     console.log("error getting user data", error)
  //     

  //   } 
  // }



  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getUser();
  //   };
  //   fetchData();
  // }, [])



  return (

    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}