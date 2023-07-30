import React, { useState } from "react";
import { Modal, Button, Container, Form } from "react-bootstrap";

import { useMutation } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";

export default function Register({ show, showRegister, showLogin }) {
  const handleClose = () => showRegister(false);
  const switchKlik = () => {
    handleClose();
    showLogin(true);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const { email, password, fullname } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      console.log("register success : ", response);
      setForm({
        email: "",
        password: "",
        fullname: "",
      });

      Swal.fire({
        toast: true,
        icon: "success",
        title: "Success",
        text: "kamu berhasil login",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log("register failed: ", error);
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} className="mt-5">
        <Modal.Body>
          <Container>
            <h3 style={{ marginTop: "1rem", fontFamily: "serif", fontWeight: "bold" }}>Register</h3>
            <div>
              <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group style={{ marginLeft: "-1rem", marginTop: "2.31rem", padding: "1rem" }} className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control value={email} onChange={handleChange} name="email" type="email" placeholder="Email" style={{ marginBottom: "1.25rem" }} />
                  <Form.Control value={password} onChange={handleChange} name="password" type="Password" placeholder="Password" style={{ marginBottom: "1.25rem" }} />
                  <Form.Control value={fullname} onChange={handleChange} name="fullname" type="text" placeholder="Fullname" />
                  <Button onClick={handleClose} type="submit" variant="dark" style={{ marginTop: "2.25rem", width: "100%" }}>
                    Register
                  </Button>

                  <p className="mt-3" style={{ textAlign: "center" }}>
                    Already have an account ? Klik{" "}
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
