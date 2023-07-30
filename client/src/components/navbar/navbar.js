import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { Image } from "react-bootstrap";
import brand from "../../assets/image/Frame.png";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext, useState } from "react";
import ProfilePhoto from "../../assets/image/ruka.jpg";
import { Cart4 } from "react-bootstrap-icons";
import { API, setAuthToken } from "../../config/api";

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
                        <Link to="/addbook" style={{ display: "flex", textDecoration: "none" }}>
                          <p>Add Book</p>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/listtransaction" style={{ display: "flex", textDecoration: "none" }}>
                          <p>List Transaction</p>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logout}>
                        <Link to="/" style={{ display: "flex", textDecoration: "none" }}>
                          <p>Log out</p>
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : state.isLogin ? (
                <>
                  <Link to="/cart" style={{ marginTop: "1.2rem", marginRight: "1rem" }}>
                    <div>
                      <Cart4 size={30} style={{ textDecoration: "none", color: "#000" }} />
                    </div>
                  </Link>
                  <Dropdown>
                    <Dropdown.Toggle style={{ background: "none", border: "none" }}>
                      <Image src={state.user.avatar} className="border border-4 rounded-circle" style={{ width: "50px", height: "50px", marginTop: "0.6rem", cursor: "pointer" }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/profile" style={{ display: "flex", textDecoration: "none" }}>
                          <p>Profile</p>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logout}>
                        <Link to="/" style={{ display: "flex", textDecoration: "none" }}>
                          <p>Log out</p>
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
