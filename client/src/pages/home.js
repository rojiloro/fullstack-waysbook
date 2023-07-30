import { Container } from "react-bootstrap";
import Listbook from "../components/listBook/listbook";
import Slider from "../components/slider/slider";

export default function Home() {
  return (
    <>
      <Container>
        <h4 style={{ fontFamily: "serif", textAlign: "center", marginTop: "7.06rem" }}>With us, you can shop online & help</h4>
        <h4 style={{ fontFamily: "serif", textAlign: "center" }}>save your high street at the same time</h4>

        <Slider />
        <h5 className="fw-bold fs-3 mt-5" style={{ fontFamily: "serif" }}>
          List Book
        </h5>
        <Listbook />
      </Container>
    </>
  );
}
