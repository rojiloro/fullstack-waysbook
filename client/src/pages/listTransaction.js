import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function ListTransaction() {
  let { data: transaction, refetch } = useQuery("transactionCache", async () => {
    const response = await API.get("/transactions");
    console.log("response transaksi", response);
    return response.data.data;
  });

  return (
    <>
      <Container style={{ marginTop: "7.06rem", marginLeft: "10rem" }}>
        <p className="fs-4 fw-bold" style={{ fontFamily: "serif" }}>
          Incoming Transaction
        </p>
        <Row>
          <Col xs={1}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>No</p>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>Users</p>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>Evidence of Transfer</p>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>Product Purchased</p>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>Total Payment</p>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>Status Payment</p>
            </div>
          </Col>
        </Row>
        <hr style={{ marginTop: "-0.5rem" }}></hr>
        {transaction?.map((data, index) => (
          <Row>
            <Col xs={1}>
              <div>
                <p>{index + 1}</p>
              </div>
            </Col>
            <Col lg={2}>
              <div>
                <p>{data?.User.fullname}</p>
              </div>
            </Col>
            <Col lg={2}>
              <div style={{ color: "blue" }}>
                <p>bca.jpg</p>
              </div>
            </Col>
            <Col lg={2}>
              {data?.cart.map((item, index) => (
                <div>
                  <p>
                    ({index + 1}) {item?.book.title}
                  </p>
                </div>
              ))}
            </Col>
            <Col lg={2}>
              <div style={{ color: "green" }}>
                <p>{data?.total}</p>
              </div>
            </Col>
            <Col lg={2}>
              {data?.status === "pending" ? (
                <div style={{ color: "red" }}>
                  <p>{data?.status}</p>
                </div>
              ) : (
                <div style={{ color: "green" }}>
                  <p>{data?.status}</p>
                </div>
              )}
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}
