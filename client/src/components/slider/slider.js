import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "bootstrap/dist/css/bootstrap.min.css";

import Book1 from "../../assets/image/Rectangle 3.png";
export default function Slider() {
  return (
    <>
      <div className="container py-4 px-4 justify-content-center">
        <Swiper Scrollbar={true} grabCursor={true} modules={[Scrollbar]} className="mySwiper" slidesPreview={2} spaceBetween={10}>
          <SwiperSlide>
            <Row>
              <Col>
                <div className="d-flex">
                  <div>
                    <Image src={Book1} />
                  </div>
                  <div style={{ marginLeft: "1rem", lineHeight: "1" }}>
                    <div className="fw-bold fs-4" style={{ fontFamily: "serif" }}>
                      <p>Sebuah Seni Untuk</p>
                      <p>Bersikap Bodo Amat</p>
                    </div>
                    <div style={{ color: "grey" }}>
                      <p>By. Mark Manson</p>
                    </div>
                    <div className="fw-400" style={{ lineHeight: "1" }}>
                      <p>"Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...</p>
                    </div>
                    <div className="fs-4 fw-bold mt-3" style={{ color: "green" }}>
                      <p>Rp. 59.000</p>
                    </div>
                    <div style={{ width: "100%" }}>
                      <Button variant="dark">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex">
                  <div>
                    <Image src={Book1} />
                  </div>
                  <div style={{ marginLeft: "1rem", lineHeight: "1" }}>
                    <div className="fw-bold fs-4" style={{ fontFamily: "serif" }}>
                      <p>Sebuah Seni Untuk</p>
                      <p>Bersikap Bodo Amat</p>
                    </div>
                    <div style={{ color: "grey" }}>
                      <p>By. Mark Manson</p>
                    </div>
                    <div className="fw-400" style={{ lineHeight: "1" }}>
                      <p>"Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...</p>
                    </div>
                    <div className="fs-4 fw-bold mt-3" style={{ color: "green" }}>
                      <p>Rp. 59.000</p>
                    </div>
                    <div style={{ width: "100%" }}>
                      <Button variant="dark">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </SwiperSlide>
          <SwiperSlide>
            <Row>
              <Col>
                <div className="d-flex">
                  <div>
                    <Image src={Book1} />
                  </div>
                  <div style={{ marginLeft: "1rem", lineHeight: "1" }}>
                    <div className="fw-bold fs-4" style={{ fontFamily: "serif" }}>
                      <p>Sebuah Seni Untuk</p>
                      <p>Bersikap Bodo Amat</p>
                    </div>
                    <div style={{ color: "grey" }}>
                      <p>By. Mark Manson</p>
                    </div>
                    <div className="fw-400" style={{ lineHeight: "1" }}>
                      <p>"Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...</p>
                    </div>
                    <div className="fs-4 fw-bold mt-3" style={{ color: "green" }}>
                      <p>Rp. 59.000</p>
                    </div>
                    <div style={{ width: "100%" }}>
                      <Button variant="dark">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex">
                  <div>
                    <Image src={Book1} />
                  </div>
                  <div style={{ marginLeft: "1rem", lineHeight: "1" }}>
                    <div className="fw-bold fs-4" style={{ fontFamily: "serif" }}>
                      <p>Sebuah Seni Untuk</p>
                      <p>Bersikap Bodo Amat</p>
                    </div>
                    <div style={{ color: "grey" }}>
                      <p>By. Mark Manson</p>
                    </div>
                    <div className="fw-400" style={{ lineHeight: "1" }}>
                      <p>"Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...</p>
                    </div>
                    <div className="fs-4 fw-bold mt-3" style={{ color: "green" }}>
                      <p>Rp. 59.000</p>
                    </div>
                    <div style={{ width: "100%" }}>
                      <Button variant="dark">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
