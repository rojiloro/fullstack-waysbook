import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import { BagCheck } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import book2 from "../assets/image/Rectangle 9.png";
import { API } from "../config/api";
import { useQuery } from "react-query";
import moment from "moment";

export default function DetailBook() {
  let { id } = useParams();

  let { data: book } = useQuery("detailCache", async () => {
    const response = await API.get(`/detailBook/` + id);
    console.log("inii data dari backendd: ", response.data.data);
    return response.data.data;
  });

  const result = moment(book?.publication_date).format("Dd MMMM YYYY");

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
              <Button variant="dark">
                Add Cart <BagCheck className="mx-1" />
              </Button>
            </div>
          </Link>
        </div>
      </Container>
    </>
  );
}
