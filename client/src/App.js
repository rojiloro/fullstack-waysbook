import { Route, Routes } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import { useNavigate } from "react-router-dom";
import PrivateRoute, { PrivateRouteAdmin } from "./private-route/privateroute";

import Header from "./components/navbar/navbar";
import Home from "./pages/home";
import DetailBook from "./pages/detailBook";
import Cart from "./pages/cart";
import ListTransaction from "./pages/listTransaction";
import AddBook from "./pages/addBook";
import Profile from "./pages/profile";
import EditProfile from "./pages/editProfile";
import Complain from "./pages/complain";
function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check");
      console.log("check user success : ", response);

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/" element={<PrivateRouteAdmin />}>
            <Route path="/detailBook/:id" element={<DetailBook />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile/:id" element={<EditProfile />} />
            <Route path="/complain" element={<Complain />} />
          </Route>

          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/listtransaction" element={<ListTransaction />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/complain" element={<Complain />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
