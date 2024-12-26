import { useContext,createContext } from "react";

export const UserContext=createContext({
     user:null,
     setUser:()=>{},
     post:null,
     setpost:()=>{},
})

export const useUser=()=>{
    return useContext(UserContext);
}

export const UserProvider=UserContext.Provider