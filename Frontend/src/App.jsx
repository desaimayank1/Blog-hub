
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
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import env from "react-dotenv";
import { useState } from "react";
import { UserProvider } from "./context";

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
     <Route path="/" element={<Format/>}>
           <Route path='' element={<Dashboard/>}/>
           <Route path='create' element={<CreatePost/>}/>
           <Route path='profile' element={<Profile/>}/>
           <Route path='post' element={<Post/>}/>
           <Route path='edit' element={<Editpost/>}/>
           <Route path='error404' element={<Error404/>}/>
           <Route path='error500' element={<Error500/>}/>   
     </Route>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
    </>
  )
)
function App() {
  const [user, setUser] = useState({});
  const [post,setPost]=useState({});
  return (
    <UserProvider value={{user,setUser,post,setPost}} >
      <RouterProvider router={router}/>
    </UserProvider>
  )
}

export default App
