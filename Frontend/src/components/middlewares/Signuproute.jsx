import { Navigate } from "react-router-dom";
import { useUser } from "../../context";
const Signuproute = ({ children }) => {
    const { loggedin,user} = useUser();
    // console.log(user);
//   if (!loggedin) {
//     return <Navigate to="/login" replace />;
//   }
  if(user.role!=null){
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Signuproute;