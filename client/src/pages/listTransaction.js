import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function ListTransaction() {
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
            <div>
              <p>1</p>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>Users</p>
            </div>
            <div>
              <p>thewel unyu</p>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>Evidence of Transfer</p>
            </div>
            <div style={{ color: "blue" }}>
              <p>bca.jpg</p>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>Product Purchased</p>
            </div>
            <div>
              <p>My Own Private Mr.Cool</p>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>Total Payment</p>
            </div>
            <div style={{ color: "green" }}>
              <p>
                <b>Rp. 75.000</b>
              </p>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "red", fontWeight: "bold", marginTop: "2rem" }}>
              <p>Status Payment</p>
            </div>
            <div style={{ color: "green" }}>
              <p>Approve</p>
            </div>
          </Col>
        </Row>
        <hr style={{ marginTop: "-0.5rem" }}></hr>
      </Container>
    </>
  );
}
