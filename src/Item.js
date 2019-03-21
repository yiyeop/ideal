import React from "react";

const Item = ({ data, clickFn, stage, length }) => {
  return (
    <div
      onClick={() => {
        clickFn(data, stage, length);
      }}
      style={{
        margin: "1rem 1rem",
        background: "#dee2e6",
        cursor: "pointer",
        borderRadius: "5px"
      }}
    >
      <div
        style={{
          width: "200px",
          margin: "0.5rem 0.5rem"
        }}
      >
        <div
          style={{
            position: "relative",
            paddingTop: "100%",
            overflow: "hidden",
            borderRadius: "3px"
          }}
        >
          <img
            src={data.img}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              maxWidth: "100%",
              height: "auto"
            }}
          />
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: "20px", margin: '0.5rem 0.5rem', padding: '0.2rem 0.5rem', background: '#f8f9fa' }}>
        {data.name}
      </div>
    </div>
  );
};

export default Item;
