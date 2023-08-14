import React from "react";
import { Button, Card } from "react-bootstrap";
import { useQuery } from "react-query";
import book2 from "../../assets/image/Rectangle 9.png";
import { API } from "../../config/api";

export default function ListBookProfile() {
  let { data: UserTransaction, refetch } = useQuery("UserTransactionCache", async () => {
    const response = await API.get("user-transaction");
    console.log("ini respon user transaction: ", response);
    return response.data.data;
  });

  console.log("ini data transaksi, ", UserTransaction);

  return (
    <>
      <div>
        <>
          <div className="d-flex flex-wrap gap-3">
            {UserTransaction?.map((data) =>
              data?.cart?.map((item) => (
                <Card style={{ width: "25%", marginBottom: "1rem" }}>
                  <>
                    <Card.Img src={item?.book.thumbnail} alt="foto buku" style={{ height: "200px" }} />
                    <Card.Body className="lh-1">
                      <Card.Title className="fs-4" style={{ fontFamily: "serif" }}>
                        {item?.book.title}
                      </Card.Title>
                      <Card.Text style={{ color: "grey", fontWeight: "400" }}>By. {item?.book.author}</Card.Text>
                      <Button variant="dark" style={{ width: "100%" }}>
                        <b>Download</b>
                      </Button>
                    </Card.Body>
                  </>
                </Card>
              ))
            )}
          </div>
        </>
      </div>
    </>
  );
}
