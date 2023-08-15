import React from "react";

export default function Complain() {
  return (
    <>
      <div className="Container" style={{ marginTop: "7rem", marginLeft: "15rem" }}>
        <div style={{ backgroundColor: "#DFDFDF", height: "28rem", width: "850px", borderRadius: "10px" }}>
          <div style={{ borderRadius: "10px", width: "100%", height: "4.75rem", backgroundColor: "#C4C4C4" }}></div>
          <input placeholder="write your type" type="text" style={{ background: "#C4C4C4", width: "100%" }} />
        </div>
      </div>
    </>
  );
}
