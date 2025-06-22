import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
const Protectedroute = ({ children }) => {
    const { loggedin,user} = useUser();
    console.log("user :" ,user);
  if (!loggedin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protectedroute;