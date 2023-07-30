import React, { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useMutation } from "react-query";
import icon from "../assets/image/knowledge 2.png";
import { API } from "../config/api";
import Swal from "sweetalert2";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    publication_date: "",
    pages: "",
    ISBN: "",
    author: "",
    price: "",
    description: "",
    bookattachment: "",
    thumbnail: "",
  });

  const { title, publication_date, pages, ISBN, author, price, description, bookattachment, thumbnail } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.thumbnail) {
        formData.set("image", form?.thumbnail[0], form?.thumbnail[0]?.name);
      }

      const response = await API.post("/addbook", formData, config);
      console.log("addbook success: ", response);
      setForm({
        title: "",
        publication_date: "",
        pages: "",
        ISBN: "",
        author: "",
        price: "",
        description: "",
        bookattachment: "",
        thumbnail: "",
      });
      Swal.fire({
        toast: true,
        icon: "success",
        title: "Success",
        text: "berhasil tambah buku",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log("addbook failed: ", error);
      Swal.fire({
        toast: true,
        icon: "error",
        title: "error",
        text: "yah gagal..",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  });

  return (
    <>
      <Container style={{ marginTop: "7.06rem" }}>
        <div style={{ marginLeft: "10rem" }}>
          <div className="fs-4 fw-bold" style={{ fontFamily: "serif", marginTop: "10rem" }}>
            <p>Add Book</p>
          </div>
          <div>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group>
                <Form.Control onChange={handleChange} name="title" type="text" placeholder="Title" style={{ padding: "0.2rem", width: "80%", marginBottom: "1.94rem" }} />
                <Form.Control onChange={handleChange} name="publication_date" type="date" placeholder="Publication Date" style={{ padding: "0.2rem", width: "20%", marginBottom: "1.94rem" }} />
                <Form.Control onChange={handleChange} name="pages" type="number" placeholder="Pages" style={{ padding: "0.2rem", width: "80%", marginBottom: "1.94rem" }} />
                <Form.Control onChange={handleChange} name="ISBN" type="text" placeholder="ISBN" style={{ padding: "0.2rem", width: "80%", marginBottom: "1.94rem" }} />
                <Form.Control onChange={handleChange} name="author" type="text" placeholder="Author" style={{ padding: "0.2rem", width: "80%", marginBottom: "1.94rem" }} />
                <Form.Control onChange={handleChange} name="price" type="number" placeholder="Price" style={{ padding: "0.2rem", width: "80%", marginBottom: "1.94rem" }} />
                <Form.Control onChange={handleChange} name="description" as="textarea" placeholder="About This Book" style={{ width: "80%", resize: "none", marginBottom: "1.94rem" }} />
                <Form.Label className="mx-2">Attach file</Form.Label>
                <Form.Control onChange={handleChange} name="bookattachment" type="text" style={{ width: "80%", marginBottom: "1.94rem", marginRight: "1rem " }} />
                <Form.Label>Upload Foto</Form.Label>
                <Form.Control onChange={handleChange} name="thumbnail" type="file" style={{ width: "20%", marginBottom: "1.94rem" }} />

                <div style={{ textAlign: "end", width: "80%", marginBottom: "5rem" }}>
                  <Button variant="dark" type="submit">
                    Add Book <Image src={icon} />
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
}
