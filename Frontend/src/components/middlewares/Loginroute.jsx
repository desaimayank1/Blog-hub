import { Navigate } from "react-router-dom";
import { useUser } from "../../context";
const Loginroute = ({ children }) => {
    const { loggedin} = useUser();
  if (loggedin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Loginroute;