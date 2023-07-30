import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import { BagCheck } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import book2 from "../assets/image/Rectangle 9.png";

export default function DetailBook() {
  return (
    <>
      <Container style={{ marginTop: "7.06rem" }}>
        <div className="d-flex py-5" style={{ marginLeft: "10rem" }}>
          <div>
            <Image src={book2} style={{ width: "15rem" }} />
          </div>
          <div className="mx-5">
            <div className="fs-3 fw-bold" style={{ fontFamily: "serif" }}>
              <p>My Own Private Mr Cool</p>
            </div>
            <div style={{ marginTop: "-1rem", color: "grey", fontStyle: "italic" }}>
              <p>By. Indah Hanaco</p>
            </div>
            <div className="fw-bold">
              <p>Publication date</p>
            </div>
            <div style={{ color: "grey", marginTop: "-1rem" }}>
              <p>August 2018</p>
            </div>
            <div className="fw-bold">
              <p>Pages</p>
            </div>
            <div style={{ color: "grey", marginTop: "-1rem" }}>
              <p>264</p>
            </div>
            <div className="fw-bold" style={{ color: "red" }}>
              <p>ISBN</p>
            </div>
            <div style={{ color: "grey", marginTop: "-1rem" }}>
              <p>9786020395227</p>
            </div>
            <div className="fw-bold">
              <p>Price</p>
            </div>
            <div className="fw-bold" style={{ color: "green", marginTop: "-1rem" }}>
              <p>Rp. 75.000</p>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "10rem", width: "75%", textAlign: "justify" }}>
          <h3>About This Book</h3>
          <div className="">
            <p>
              Bagi Heidy Theapila, latar belakang keluarga membuatnya tak mudah menemukan pasangan sejiwa. Tapi, ceritanya berbeda dengan Mirza. Heidy meyakini lelaki itu mencintainya dengan tulus. Namun, keyakinannya tumbang. Pertemuan
              mereka bukan cuma karena campur tangan Allah semata. Melainkan karena skenario rapi yang berkaitan dengan materi. Marah sekaligus patah hati, Heidy membatalkan rencana masa depannya dan memilih kabur ke Italia. Langkahnya
              mungkin tak dewasa, tapi Heidy butuh ruang untuk meninjau ulang semua rencana dalam hidupnya. Lalu, Allah memberinya kejutan. Dalam pelayaran menyusuri Venesia, Heidy bertemu raksasa bermata biru. Graeme MacLeod, pria yang
              mencuri napasnya di pertemuan pertama mereka. Meski ketertarikan di antara mereka begitu besar, Heidy tidak berniat menjalin asmara singkat. Graeme harus dilupakan. Ketika apa yang terjadi di Venesia tidak bisa tetap ditinggal
              di Venesia, Heidy mulai goyah. Apalagi Graeme ternyata lelaki gigih yang mengejarnya hingga ke Jakarta dan tak putus asa tatkala ditolak. Meski akhirnya satu per satu rahasia kelam lelaki itu terbuka, Heidy justru kian jatuh
              cinta. Pertanyaannya, apakah cinta memang benar-benar mampu menyatukan mereka?
            </p>
          </div>
          <Link to="/cart">
            <div style={{ textAlign: "end", marginTop: "2rem" }}>
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
