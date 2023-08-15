import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { Image } from "react-bootstrap";
import brand from "../../assets/image/Frame.png";
import cartIcon from "../../assets/image/Group (2).png";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import ProfilePhoto from "../../assets/image/ruka.jpg";
import knowledge from "../../assets/image/knowledge 1.png";
import Chat from "../../assets/image/Group (1).png";
import Out from "../../assets/image/logout 1.png";
import iconProfile from "../../assets/image/user 2.png";

import { API, setAuthToken } from "../../config/api";
import { Book } from "react-bootstrap-icons";
import { useQuery } from "react-query";

export default function Header(props) {
  const [ShowLogin, setShowLogin] = useState(false);
  const [ShowRegister, setShowRegister] = useState(false);

  const [state, dispatch] = useContext(UserContext);
  setAuthToken(localStorage.token);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  
  let { data: cart, refetch } = useQuery("orderNavCache", async () => {
    const response = await API.get("/order-user");
    console.log("response order user : ", response);
    return response.data.data;
  });

  return (
    <>
      <Navbar fixed="top" bg="light" data-bs-theme="light" style={{ width: "100%", boxShadow: "0px 0px 10px rgba(0,0,0,0.5)" }}>
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <Image src={brand} />
            </Link>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <>
              {state.user.role === "admin" ? (
                <>
                  <div style={{ marginTop: "1.4rem", fontWeight: "bold" }}>{state.user.fullname} </div>
                  <Dropdown>
                    <Dropdown.Toggle style={{ background: "none", border: "none" }}>
                      <Image src={ProfilePhoto} className="border border-4 rounded-circle" style={{ width: "50px", height: "50px", marginTop: "0.6rem", cursor: "pointer" }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/addbook" style={{ display: "flex", textDecoration: "none", color: "#000" }}>
                          <img src={knowledge} style={{ width: "2rem", height: "2rem" }} />
                          <p style={{ marginTop: "3px", marginLeft: "7px" }}>Add Book</p>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/listtransaction" style={{ display: "flex", textDecoration: "none", color: "#000" }}>
                          <Book size={5} style={{ width: "2rem", height: "2rem" }} />
                          <p style={{ marginTop: "3px", marginLeft: "7px" }}>List Transaction</p>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/complain" style={{ display: "flex", textDecoration: "none", color: "#000" }}>
                          <img src={Chat} style={{ width: "2rem", height: "2rem" }} />
                          <p style={{ marginTop: "3px", marginLeft: "7px" }}>Complain</p>
                        </Link>
                      </Dropdown.Item>
                      <hr></hr>
                      <Dropdown.Item onClick={logout}>
                        <Link to="/" style={{ display: "flex", textDecoration: "none", color: "#000" }}>
                          <img src={Out} style={{ width: "2rem", height: "2rem" }} />
                          <p style={{ marginTop: "3px", marginLeft: "7px" }}>Log out</p>
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : state.isLogin ? (
                <>
                  <Link to="/cart" style={{ marginTop: "1.2rem", marginRight: "1rem" }}>
                    <div>
                      <span class="position-absolute translate-middle badge rounded-pill bg-danger">{cart?.length}</span>
                      <img src={cartIcon}></img>
                    </div>
                  </Link>
                  <Dropdown>
                    <Dropdown.Toggle style={{ background: "none", border: "none" }}>
                      <Image src= {state.user.avatar} className="border border-4 rounded-circle" style={{ width: "50px", height: "50px", marginTop: "0.6rem", cursor: "pointer" }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/profile" style={{ display: "flex", textDecoration: "none", color: "#000" }}>
                          <img src={iconProfile} style={{ width: "2rem", height: "2rem" }} />
                          <p style={{ marginTop: "3px", marginLeft: "7px" }}>Profile</p>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/complain" style={{ display: "flex", textDecoration: "none", color: "#000" }}>
                          <img src={Chat} style={{ width: "2rem", height: "2rem" }} />
                          <p style={{ marginTop: "3px", marginLeft: "7px" }}>Complain</p>
                        </Link>
                      </Dropdown.Item>
                      <hr></hr>
                      <Dropdown.Item onClick={logout}>
                        <Link to="/" style={{ display: "flex", textDecoration: "none", color: "#000" }}>
                          <img src={Out} style={{ width: "2rem", height: "2rem" }} />
                          <p style={{ marginTop: "3px", marginLeft: "7px" }}>Log out</p>
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Button onClick={() => setShowLogin(true)} className="btn btn-light mx-3" style={{ border: "1px solid #000", padding: "3px 18px" }}>
                    Login
                  </Button>
                  <Button onClick={() => setShowRegister(true)} className="btn btn-dark">
                    Register
                  </Button>
                </>
              )}
            </>
          </Nav>
        </Container>
      </Navbar>
      <Login show={ShowLogin} showLogin={setShowLogin} showRegister={setShowRegister} />
      <Register show={ShowRegister} showRegister={setShowRegister} showLogin={setShowLogin} />
    </>
  );
}
