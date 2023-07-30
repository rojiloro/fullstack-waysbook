import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";

export default function EditProfile() {
  let id = useParams();
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    email: "",
    gender: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const UpdateProfile = async () => {
    const response = await API.get("/user");
    console.log(response.data.data);
    setPreview(response.data.data.avatar);

    setForm({
      ...form,
      email: response.data.data.email,
      gender: response.data.data.gender,
      phone: response.data.data.phone,
      address: response.data.data.address,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    UpdateProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
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
      if (form.avatar) {
        formData.set("image", form?.avatar[0], form?.avatar[0]?.name);
      }
      formData.set("email", form.email);
      formData.set("gender", form.gender);
      formData.set("phone", form.phone);
      formData.set("address", form.address);

      const response = await API.patch("/user", formData, config);
      console.log("ini datanya : ", response.data);

      navigate("/profile");
    } catch (error) {
      console.log("gagal update : ", error);
    }
  });

  return (
    <>
      <Container style={{ marginTop: "7.06rem" }}>
        <div className="fs-4 fw-bold" style={{ fontFamily: "serif", marginLeft: "7rem" }}>
          <p>Edit Profile</p>
        </div>

        <div className="d-flex justify-content-center">
          <div className="d-flex" style={{ padding: "2.31rem", backgroundColor: "#FFD9D9", width: "80%", borderRadius: "0.5rem" }}>
            <div>
              <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group>
                  <Form.Control type="text" placeholder="Email" name="email" onChange={handleChange} value={form?.email} style={{ padding: "0.2rem", width: "150%", marginBottom: "1.94rem" }} />
                  <Form.Control type="text" placeholder="Gender" name="gender" onChange={handleChange} value={form?.gender} style={{ padding: "0.2rem", width: "150%", marginBottom: "1.94rem" }} />
                  <Form.Control type="text" placeholder="Phone" name="phone" onChange={handleChange} value={form?.phone} style={{ padding: "0.2rem", width: "150%", marginBottom: "1.94rem" }} />
                  <Form.Control as="textarea" placeholder="Address" name="address" onChange={handleChange} value={form?.address} style={{ width: "150%", resize: "none", marginBottom: "1.94rem" }} />
                  <Button type="submit" variant="dark" className="fw-bold">
                    Update Profile
                  </Button>
                </Form.Group>
              </Form>
            </div>
            <div style={{ marginLeft: "10rem" }}>
              {preview && (
                <div>
                  <img alt="preview" src={preview} style={{ border: "1px solid #000", width: "12rem", height: "12rem", borderRadius: "10px" }} />
                </div>
              )}
              <input id="upload" name="avatar" onChange={handleChange} type="file" style={{ marginTop: "1rem" }} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
