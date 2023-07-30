import React from "react";
import { Button, Card } from "react-bootstrap";
import book2 from "../../assets/image/Rectangle 9.png";

export default function ListBookProfile() {
  return (
    <>
      <div>
        <Card style={{ width: "26%", height: "200px" }}>
          <Card.Img src={book2} />
          <Card.Body className="lh-1">
            <Card.Title className="fs-4" style={{ fontFamily: "serif" }}>
              My Own Private Mr. Cool
            </Card.Title>
            <Card.Text style={{ color: "grey", fontWeight: "400" }}>By. Indah Hanaco</Card.Text>
            <Button variant="dark" style={{ width: "100%" }}>
              <b>Download</b>
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
