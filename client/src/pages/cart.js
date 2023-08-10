import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

import payment from "../assets/image/Group 16.jpg";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import ModalDelete from "../components/modalDelete/modal-delete";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let navigate = useNavigate();
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/order/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  const handleBuy = useMutation(async (e) => {
    try {
      const formData = new FormData();
      formData.set("user_id", cart[0]?.user_id);
      formData.set("total", Subtotal);

      const response = await API.post("/transaction", formData);
      console.log("ini respon broooo", response);

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          console.log(result);
          navigate("/profile");
        },
        onClose: function () {
          alert("You closed the popup without finishing the payment!");
        },
      });
    } catch (error) {
      console.log("gagal transaksi : ", error);
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const myMidtransClientKey = process.env.CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  let { data: cart, refetch } = useQuery("orderCache", async () => {
    const response = await API.get("/order-user");
    console.log("response order user : ", response);
    return response.data.data;
  });

  const Subtotal = cart?.reduce((acc, data) => acc + data?.Book?.price, 0);
  const qty = cart?.length;
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
          {cart < 1 ? (
            <h4>Keranjang kosong</h4>
          ) : (
            <>
              {cart?.map((data, index) => (
                <>
                  <div className="d-flex mb-3">
                    <div key={index} value={data?.Book?.id}>
                      <Image src={data?.Book?.thumbnail} style={{ width: "300px", objectFit: "cover" }} />
                    </div>
                    <div className="mx-5">
                      <div className="fs-5" style={{ fontFamily: "serif" }}>
                        <p>{data?.Book?.title}</p>
                      </div>
                      <div style={{ color: "grey", marginTop: "-0.5rem" }}>
                        <p>{data?.Book?.author}</p>
                      </div>
                      <div className="fw-bold fs-5" style={{ color: "green" }}>
                        <p>Rp.{data?.Book?.price}</p>
                      </div>
                    </div>
                    <div
                      style={{ marginLeft: "5.3rem", cursor: "pointer" }}
                      onClick={() => {
                        handleDelete(data.id);
                      }}
                    >
                      <Trash size={30} />
                    </div>
                  </div>
                  <hr style={{ width: "100%" }}></hr>
                </>
              ))}
            </>
          )}
        </div>
        {/* bagian total */}
        <div style={{ width: "35%" }}>
          <div style={{ marginTop: "12rem", marginLeft: "3rem" }}>
            <hr style={{ width: "100%" }}></hr>
            <div className="d-flex">
              <div>
                <p>Subtotal</p>
              </div>
              <div style={{ marginLeft: "15rem" }}>
                <p>{Subtotal}</p>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <p>Qty</p>
              </div>
              <div style={{ marginLeft: "20rem" }}>
                <p>{qty}</p>
              </div>
            </div>
            <hr style={{ width: "100%" }}></hr>
            <div className="d-flex fw-bold" style={{ color: "green" }}>
              <div>
                <p>Total</p>
              </div>
              <div style={{ marginLeft: "16.5rem" }}>
                <p>{Subtotal}</p>
              </div>
            </div>
            <div className="mt-5 d-flex justify-content-end">
              <Image src={payment} />
            </div>
            <p style={{ marginLeft: "10.5rem", marginTop: "-2rem", color: "grey" }}>Attache of transaction</p>
            <div className="d-flex justify-content-end mt-5">
              <Button variant="dark" style={{ width: "71%" }} onClick={(e) => handleBuy.mutate(e)}>
                <b>Pay</b>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ModalDelete setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
    </>
  );
}
