import React, { useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { BagCheck } from "react-bootstrap-icons";
import { Link, useNavigate, useParams } from "react-router-dom";

import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import moment from "moment";

export default function DetailBook() {
  let { id } = useParams();
  let navigate = useNavigate();

  let { data: book } = useQuery("detailCache", async () => {
    const response = await API.get(`/detailBook/` + id);
    console.log("inii data dari backendd: ", response.data.data);
    return response.data.data;
  });

  const result = moment(book?.publication_date).format("D MMMM YYYY");

  const handleOrder = useMutation(async (formData) => {
    try {
      const response = await API.post("/order", formData);
      console.log("beli buku berhasil", response);
      navigate("/cart");
    } catch (error) {
      console.log("beli gagal", error);
    }
  });

  const handlerOrderClick = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.set("book_id", id);

    handleOrder.mutate(formdata);
  };

  return (
    <>
      <Container style={{ marginTop: "7.06rem" }}>
        <div className="d-flex py-5" style={{ marginLeft: "10rem" }}>
          <div>
            <Image src={book?.thumbnail} style={{ width: "15rem" }} />
          </div>
          <div className="mx-5">
            <div className="fs-3 fw-bold" style={{ fontFamily: "serif" }}>
              <p>{book?.title}</p>
            </div>
            <div style={{ marginTop: "-1rem", color: "grey", fontStyle: "italic" }}>
              <p>{book?.author}</p>
            </div>
            <div className="fw-bold">
              <p>Publication date</p>
            </div>
            <div style={{ color: "grey", marginTop: "-1rem" }}>
              <p>{result}</p>
            </div>
            <div className="fw-bold">
              <p>Pages</p>
            </div>
            <div style={{ color: "grey", marginTop: "-1rem" }}>
              <p>{book?.pages}</p>
            </div>
            <div className="fw-bold" style={{ color: "red" }}>
              <p>ISBN</p>
            </div>
            <div style={{ color: "grey", marginTop: "-1rem" }}>
              <p>{book?.ISBN}</p>
            </div>
            <div className="fw-bold">
              <p>Price</p>
            </div>
            <div className="fw-bold" style={{ color: "green", marginTop: "-1rem" }}>
              <p>{book?.price}</p>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "10rem", width: "75%", textAlign: "justify" }}>
          <h3>About This Book</h3>
          <div className="">
            <p>{book?.description}</p>
          </div>
          <Link to="/cart">
            <div style={{ textAlign: "end", marginTop: "2rem", marginBottom: "3rem" }}>
              <Button
                variant="dark"
                onClick={(e) => {
                  handlerOrderClick(e);
                }}
              >
                Add Cart <BagCheck className="mx-1" />
              </Button>
            </div>
          </Link>
        </div>
      </Container>
    </>
  );
}
