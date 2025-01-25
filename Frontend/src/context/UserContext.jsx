
import { useContext, createContext,useState } from "react";

export const UserContext = createContext({
    user:{},
    setUser:()=>{},
    post:{},
    setPost:()=>{},
    loggedin:null,
    setLoggedIn:()=>{}
})

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [post, setPost] = useState({});
    const [loggedin, setLoggedIn] = useState(false);
    return (
        <UserContext.Provider value={{user, setUser, post, setPost, loggedin, setLoggedIn}}>
            {props.children}
        </UserContext.Provider>
    )
}