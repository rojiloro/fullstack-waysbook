import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

import book2 from "../assets/image/Rectangle 9.png";
import payment from "../assets/image/Group 16.jpg";

export default function Cart() {
  return (
    <>
      <div className="d-flex" style={{ marginTop: "7.06rem", paddingLeft: "10rem" }}>
        <div>
          <div className="d-flex py-5 fs-4 fw-bold" style={{ fontFamily: "serif" }}>
            <p>My Cart</p>
          </div>
          <div>
            <p>Review Your Order</p>
          </div>
          <hr style={{ width: "100%" }}></hr>

          <div className="d-flex mb-3">
            <div>
              <Image src={book2} />
            </div>
            <div className="mx-5">
              <div className="fs-5" style={{ fontFamily: "serif" }}>
                <p>My Own Private Mr. Cool</p>
              </div>
              <div style={{ color: "grey", marginTop: "-0.5rem" }}>
                <p>By. Indah Hanaco</p>
              </div>
              <div className="fw-bold fs-5" style={{ color: "green" }}>
                <p>Rp.75.000</p>
              </div>
            </div>
            <div style={{ marginLeft: "5.3rem", cursor: "pointer" }}>
              <Trash size={30} />
            </div>
          </div>
          <div className="d-flex mb-3">
            <div>
              <Image src={book2} />
            </div>
            <div className="mx-5">
              <div className="fs-5" style={{ fontFamily: "serif" }}>
                <p>My Own Private Mr. Cool</p>
              </div>
              <div style={{ color: "grey", marginTop: "-0.5rem" }}>
                <p>By. Indah Hanaco</p>
              </div>
              <div className="fw-bold fs-5" style={{ color: "green" }}>
                <p>Rp.75.000</p>
              </div>
            </div>
            <div style={{ marginLeft: "5.3rem", cursor: "pointer" }}>
              <Trash size={30} />
            </div>
          </div>

          <hr style={{ width: "100%" }}></hr>
        </div>
        <div style={{ width: "35%" }}>
          <div style={{ marginTop: "12rem", marginLeft: "3rem" }}>
            <hr style={{ width: "100%" }}></hr>
            <div className="d-flex">
              <div>
                <p>Subtotal</p>
              </div>
              <div style={{ marginLeft: "15rem" }}>
                <p>134.000</p>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <p>Qty</p>
              </div>
              <div style={{ marginLeft: "20rem" }}>
                <p>2</p>
              </div>
            </div>
            <hr style={{ width: "100%" }}></hr>
            <div className="d-flex fw-bold" style={{ color: "green" }}>
              <div>
                <p>Total</p>
              </div>
              <div style={{ marginLeft: "15rem" }}>
                <p>Rp. 134.000</p>
              </div>
            </div>
            <div className="mt-5 d-flex justify-content-end">
              <Image src={payment} />
            </div>
            <p style={{ marginLeft: "10.5rem", marginTop: "-2rem", color: "grey" }}>Attache of transaction</p>
            <div className="d-flex justify-content-end mt-5">
              <Button variant="dark" style={{ width: "71%" }}>
                <b>Pay</b>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
