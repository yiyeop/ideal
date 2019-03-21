import React from "react";

const Main = ({ onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20vh"
      }}
    >
      <h3>이상형 월드컵</h3>
      <input
        type="text"
        name="name"
        placeholder="이름을 입력하세요"
        onChange={onChange}
        style={{
          border: "none",
          width: "200px",
          fontSize: "16px",
          textAlign: "center",
          borderBottom: "1px solid #efefef",
          padding: "0.3rem 0.5rem"
        }}
      />
    </div>
  );
};

export default Main;
