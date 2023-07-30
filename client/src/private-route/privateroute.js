import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(UserContext);
  return state.user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export const PrivateRouteAdmin = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(UserContext);
  return state.user.role === "user" ? <Outlet /> : <Navigate to="/listtransaction" />;
};

export default PrivateRoute;
