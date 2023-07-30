import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import book2 from "../../assets/image/Rectangle 9.png";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";

export default function Listbook() {
  let navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [ShowLogin, setShowLogin] = useState(false);
  const [ShowRegister, setShowRegister] = useState(false);
  return (
    <>
      <div className="d-flex gap-3">
        <div
          className="shadow"
          onClick={() => {
            !state.isLogin ? setShowLogin(true) : navigate("/detailBook");
          }}
        >
          <Card style={{ cursor: "pointer" }}>
            <Card.Img src={book2} />
            <Card.Body className="lh-1">
              <Card.Title className="fs-4" style={{ fontFamily: "serif" }}>
                My Own Private Mr. Cool
              </Card.Title>
              <Card.Text className="fst-italic" style={{ color: "grey" }}>
                By. Indah Hanaco
              </Card.Text>
              <Card.Text className="fw-bold fs-4" style={{ color: "green" }}>
                Rp. 75.000
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <Link to="/detailBook" style={{ textDecoration: "none" }}>
          <div className="shadow">
            <Card style={{ cursor: "pointer" }}>
              <Card.Img src={book2} />
              <Card.Body className="lh-1">
                <Card.Title className="fs-4" style={{ fontFamily: "serif" }}>
                  My Own Private Mr. Cool
                </Card.Title>
                <Card.Text className="fst-italic" style={{ color: "grey" }}>
                  By. Indah Hanaco
                </Card.Text>
                <Card.Text className="fw-bold fs-4" style={{ color: "green" }}>
                  Rp. 75.000
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Link>
        <Link to="/detailBook" style={{ textDecoration: "none" }}>
          <div className="shadow">
            <Card style={{ cursor: "pointer" }}>
              <Card.Img src={book2} />
              <Card.Body className="lh-1">
                <Card.Title className="fs-4" style={{ fontFamily: "serif" }}>
                  My Own Private Mr. Cool
                </Card.Title>
                <Card.Text className="fst-italic" style={{ color: "grey" }}>
                  By. Indah Hanaco
                </Card.Text>
                <Card.Text className="fw-bold fs-4" style={{ color: "green" }}>
                  Rp. 75.000
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Link>
        <Link to="/detailBook" style={{ textDecoration: "none" }}>
          <div className="shadow">
            <Card style={{ cursor: "pointer" }}>
              <Card.Img src={book2} />
              <Card.Body className="lh-1">
                <Card.Title className="fs-4" style={{ fontFamily: "serif" }}>
                  My Own Private Mr. Cool
                </Card.Title>
                <Card.Text className="fst-italic" style={{ color: "grey" }}>
                  By. Indah Hanaco
                </Card.Text>
                <Card.Text className="fw-bold fs-4" style={{ color: "green" }}>
                  Rp. 75.000
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Link>
      </div>
      <Login show={ShowLogin} showLogin={setShowLogin} showRegister={setShowRegister} />
      <Register show={ShowRegister} showRegister={setShowRegister} showLogin={setShowLogin} />
    </>
  );
}
