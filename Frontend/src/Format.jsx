import React ,{useEffect} from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useUser } from "./context";
export default function Format() {
  const { setUser} = useUser();

  const getUser = async () => {
    try {
      // console.log('Request is about to be sent');
      // console.log(import.meta.env.VITE_SERVER_URL);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/getuser`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      })
      const data = await response.json();
      setUser(data);
      //    console.log(data);
    } catch (error) {
      console.log("error getting user data", error)
    }
  }

 

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, [])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}