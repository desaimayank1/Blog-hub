
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import Post from "./components/Post";
import CreatePost from "./components/Createpost";
import Profile from "./components/Profile";
import Error404 from "./components/partials/Error404";
import Error500 from "./components/partials/Error500";
import Format from "./Format";
import Editpost from "./components/Editpost";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { useEffect, useState } from "react";
import Protectedroute from "./components/middlewares/Protectedroute";
import Loginroute from "./components/middlewares/Loginroute";
import Signuproute from "./components/middlewares/Signuproute";
import Createroute from "./components/middlewares/Createroute";
import Loading from "./components/Loading";
import { useUser } from "./context/UserContext";
// console.log("rendering app")
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Protectedroute><Format /></Protectedroute>}>
        <Route path='' element={<Dashboard />} />
        <Route path='create' element={<Createroute><CreatePost /></Createroute>} />
        <Route path='profile' element={<Profile />} />
        <Route path='post' element={<Post />} />
        <Route path='edit' element={<Createroute><Editpost /></Createroute>} />
        <Route path='error404' element={<Error404 />} />
        <Route path='error500' element={<Error500 />} />
      </Route>
      <Route path='/login' element={<Loginroute><Login /></Loginroute>} />
      <Route path='/signup' element={<Signuproute><Signup /></Signuproute>} />
    </>
  )
)
function App() {
  
  const {setUser,setLoggedIn} =useUser();
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/getuser`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      })
      const data = await response.json();
      
      setUser(data);
      console.log("data :", data);
      
      if (data != false) {
        setLoggedIn(true)
      }
      setLoading(false);
    } catch (error) {
      console.log("error getting user data", error)
      setLoading(false);

    }
  }

  useEffect(()=>{
    const fetchData =async()=>{
      await getUser();
  };
   fetchData();
  },[])

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
          <RouterProvider router={router} />
      )}
    </>
  )
}

export default App
