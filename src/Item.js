import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 1rem 1rem;
  background: #dee2e6;
  cursor: pointer;
  border-radius: 5px;
  .img-container {
    margin: 0.5rem 0.5rem;
    width: 150px;
    @media screen and (min-width: 360px) {
      width: 170px;
    }
    @media screen and (min-width: 400px) {
      width: 200px;
    }
    @media screen and (min-width: 460px) {
      width: 210px;
    }
    @media screen and (min-width: 600px) {
      width: 270px;
    }
  }
`;

const Item = ({ data, clickFn, stage, length }) => {
  return (
    <Container
      onClick={() => {
        clickFn(data, stage, length);
      }}
    >
      <div className="img-container">
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

      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          margin: "0.5rem 0.5rem",
          padding: "0.2rem 0.5rem",
          background: "#f8f9fa"
        }}
      >
        {data.name}
      </div>
    </Container>
  );
};

export default Item;
