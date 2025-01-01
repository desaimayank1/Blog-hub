import React ,{useEffect,useState} from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useUser } from "./context";
export default function Format() {
  const { setUser} = useUser();
  const [loading,setLoading]=useState(true);
  const getUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/getuser`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      })
      const data = await response.json();
      if(data==false){
         window.location.href="/login"
      }
      setLoading(false);
      // console.log(data);
      setUser(data);
      //    console.log(data);
    } catch (error) {
      console.log("error getting user data", error)
      setLoading(false);
      
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