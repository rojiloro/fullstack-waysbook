import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import book2 from "../../assets/image/Rectangle 9.png";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

import Login from "../auth/Login";
import Register from "../auth/Register";

export default function Listbook() {
  let navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [ShowLogin, setShowLogin] = useState(false);
  const [ShowRegister, setShowRegister] = useState(false);

  let { data: book, refetch } = useQuery("BooksCache", async () => {
    const response = await API.get("/getbooks");
    console.log("ini response find", response.data.data);
    return response.data.data;
  });

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
        {book?.map((data, index) => (
          <div
            key={index}
            value={data.id}
            className="shadow"
            onClick={() => {
              !state.isLogin ? setShowLogin(true) : navigate("/detailBook/" + data.id);
            }}
          >
            <Card style={{ cursor: "pointer", width: "250px" }}>
              <Card.Img src={data.thumbnail} style={{ height: "250px" }} />
              <Card.Body className="lh-1">
                <Card.Title className="fs-4" style={{ fontFamily: "serif" }}>
                  {data.title}
                </Card.Title>
                <Card.Text className="fst-italic" style={{ color: "grey" }}>
                  {data.author}
                </Card.Text>
                <Card.Text className="fw-bold fs-4" style={{ color: "green" }}>
                  {data.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Login show={ShowLogin} showLogin={setShowLogin} showRegister={setShowRegister} />
      <Register show={ShowRegister} showRegister={setShowRegister} showLogin={setShowLogin} />
    </>
  );
}
