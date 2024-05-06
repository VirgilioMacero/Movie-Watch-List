import React from "react";

export default function CastCard(props) {
  return (
    <div
      className="p-3 d-flex align-items-end gap-2"
      style={{ border: "1px solid", borderRadius: "20px" }}
    >
      <img
        src={props.urlImage}
        height={100}
        style={{ borderRadius: "25px" }}
      ></img>
      <div className="d-flex flex-column gap-1">
        <h6
          className="px-2 py-1 mb-0"
          style={{ border: "1px solid black", borderRadius: "10px" }}
        >
          Character: <br />
          {props.character}
        </h6>
        <h6
          className="px-2 py-1 mb-0"
          style={{ border: "1px solid black", borderRadius: "10px" }}
        >
          Actor: <br />
          {props.name}
        </h6>
      </div>
    </div>
  );
}
