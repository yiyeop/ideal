import React, { Component } from "react";
import { data as girlData } from "./data";
import ItemSelector from "./ItemSelector";
import Main from "./Main";

class App extends Component {
  state = {
    name: "",
    start: false
  };

  render() {
    return (
      <>
        {this.state.start ? (
          <ItemSelector data={girlData} name={this.state.name} />
        ) : (
          <>
            <Main
              onChange={e => {
                this.setState({
                  [e.target.name]: e.target.value
                });
              }}
            />
            <div
              style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}
            >
              <button
                style={{
                  all: "unset",
                  border: "1px solid #efefef",
                  padding: "0.5rem 1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  borderRadius: "4px",
                  background: "#7048e8",
                  color: "white"
                }}
                onClick={() => {
                  if (this.state.name === "") {
                    alert("이름을 입력하세요!");
                  } else {
                    this.setState({
                      start: true
                    });
                  }
                }}
              >
                시작하기
              </button>
            </div>
          </>
        )}
        <div
          style={{
            borderTop: "1px solid #efefef",
            width: "100%",
            color: "grey",
            fontSize: "12px",
            textAlign: "center",
            position: "absolute",
            bottom: 0,
            padding: "1rem 1rem"
          }}
        >
          이상형월드컵 Made By 대치 역삼 연합회
        </div>
      </>
    );
  }
}

export default App;
