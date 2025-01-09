import { Navigate } from "react-router-dom";
import { useUser } from "../../context";
const Signuproute = ({ children }) => {
   const { user} = useUser();

  if(user.role!=null){
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Signuproute;