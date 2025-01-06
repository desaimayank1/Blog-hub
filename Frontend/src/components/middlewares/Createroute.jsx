import { Navigate } from "react-router-dom";
import { useUser } from "../../context";
const Createroute = ({ children }) => {
    const { user} = useUser();

  if(user.role=='1'){
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Createroute;