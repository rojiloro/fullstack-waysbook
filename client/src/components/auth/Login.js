import React from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

import { useMutation } from "react-query";
import { API, setAuthToken } from "../../config/api";

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
export default function Login({ show, showLogin, showRegister }) {
  let navigate = useNavigate();

  const handleClose = () => showLogin(false);
  const switchKlik = () => {
    handleClose();
    showRegister(true);
  };

  // usecontext login
  const [_, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form);
      console.log("login success : ", response);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);
      Swal.fire({
        toast: true,
        icon: "success",
        title: "Success",
        text: "kamu berhasil login",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
      if (response.data.data.role === "admin") {
        navigate("/listtransaction");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("login failed : ", error);
    }
  });
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Container>
            <h3 style={{ marginTop: "2.56rem", fontFamily: "serif", fontWeight: "bold" }}>Login</h3>
            <div>
              <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group style={{ marginLeft: "-1rem", marginTop: "2.31rem", padding: "1rem" }} className="mb-3">
                  <Form.Control value={email} onChange={handleChange} id="email" name="email" type="email" placeholder="Email" style={{ marginBottom: "1.25rem" }} />
                  <Form.Control value={password} onChange={handleChange} id="password" name="password" type="Password" placeholder="Password" />
                  <Button onClick={handleClose} type="submit" variant="dark" style={{ marginTop: "2.25rem", width: "100%" }}>
                    Login
                  </Button>

                  <p className="mt-3" style={{ textAlign: "center" }}>
                    Don't have account ? Klik{" "}
                    <b style={{ cursor: "pointer" }} onClick={switchKlik}>
                      Here
                    </b>{" "}
                  </p>
                </Form.Group>
              </Form>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
