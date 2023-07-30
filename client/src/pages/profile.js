import React, { useContext, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { EnvelopeFill, GenderAmbiguous, TelephoneFill, GeoAltFill } from "react-bootstrap-icons";

import ListBookProfile from "../components/listBook/listbookProfile";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

export default function Profile() {
  const [state] = useContext(UserContext);
  let navigate = useNavigate();
  setAuthToken(localStorage.token);
  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get(`/user`);
    console.log("iniii", response.data.data);
    return response.data.data;
  });
  return (
    <>
      <Container style={{ marginTop: "7.06rem" }}>
        <div className="fs-4 fw-bold" style={{ fontFamily: "serif", marginLeft: "7rem" }}>
          <p>Profile</p>
        </div>

        <div className="d-flex justify-content-center" value={user?.id}>
          <div className="d-flex" style={{ padding: "2.31rem", backgroundColor: "#FFD9D9", width: "80%", borderRadius: "0.5rem" }}>
            <div>
              <div className="d-flex" style={{ marginBottom: "1.75rem" }}>
                <div>
                  <EnvelopeFill size={40} style={{ opacity: "0.5" }} />
                </div>
                <div className="mx-3">
                  <p className="fw-bold">{user?.email}</p>
                  <p style={{ color: "grey", marginTop: "-1.2rem" }}>Email</p>
                </div>
              </div>
              <div className="d-flex" style={{ marginBottom: "1.75rem" }}>
                <div>
                  <GenderAmbiguous size={40} style={{ opacity: "0.5" }} />
                </div>
                <div className="mx-3">
                  <p className="fw-bold">{user?.gender}</p>
                  <p style={{ color: "grey", marginTop: "-1.2rem" }}>Gender</p>
                </div>
              </div>
              <div className="d-flex" style={{ marginBottom: "1.75rem" }}>
                <div>
                  <TelephoneFill size={40} style={{ opacity: "0.5" }} />
                </div>
                <div className="mx-3">
                  <p className="fw-bold">{user?.phone}</p>
                  <p style={{ color: "grey", marginTop: "-1.2rem" }}>Mobile Phone</p>
                </div>
              </div>
              <div className="d-flex" style={{ marginBottom: "1.75rem" }}>
                <div>
                  <GeoAltFill size={40} style={{ opacity: "0.5" }} />
                </div>
                <div className="mx-3">
                  <p className="fw-bold">{user?.address}</p>
                  <p style={{ color: "grey", marginTop: "-1.2rem" }}>Address</p>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "20rem" }}>
              <Image src={user?.avatar} style={{ width: "14rem", borderRadius: "0.5rem", marginTop: "2rem" }} />
              <div className="fs-5 fw-bold" style={{ textAlign: "center" }}>
                <p>{state.user?.fullname}</p>
              </div>
              <Button onClick={() => navigate(`/editprofile/` + user.id)} variant="danger" style={{ width: "100%" }}>
                <b>Edit Profile</b>
              </Button>
            </div>
          </div>
        </div>

        <div className="fs-4 fw-bold" style={{ marginLeft: "7rem", marginTop: "3rem", fontFamily: "serif" }}>
          <p>My Books</p>
          <ListBookProfile />
        </div>
      </Container>
    </>
  );
}
