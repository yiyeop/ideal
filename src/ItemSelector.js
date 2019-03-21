import React, { useState, useEffect } from "react";
import Item from "./Item";

const arrShuffle = arr => {
  return arr.sort(() => {
    return Math.random() - Math.random();
  });
};

const Versus = () => {
  return (
    <div
      style={{
        margin: "120px -0.5rem 0 -0.5rem",
        color: "#f03e3e",
        fontSize: "14px",
        fontWeight: 600
      }}
    >
      VS
    </div>
  );
};

const ItemSelector = ({ data, name }) => {
  const [stage, setStage] = useState(0);
  const [round, setRound] = useState(0);
  const [hidden, setHidden] = useState(false);

  const [shuffled, setShuffled] = useState(null);

  const [currentRoundSelected, setCurrentRoundSelected] = useState([]);
  const [selected, setSelected] = useState([]);
  const [oldSelected, setOldSelected] = useState([]);

  const addSelect = lastData => {
    // 마지막 선택 포함하여 셔플해서 다음단계로 넘김
    const newShuffle = arrShuffle([...currentRoundSelected, lastData]);
    setSelected(newShuffle);
    setOldSelected([...oldSelected, newShuffle]);
  };

  const addOddSelect = (lastData, currentData) => {
    // 마지막 선택 포함하여 셔플해서 다음단계로 넘김
    const newShuffle = arrShuffle([
      ...currentRoundSelected,
      currentData,
      lastData
    ]);
    setSelected(newShuffle);
    setOldSelected([...oldSelected, newShuffle]);
  };

  useEffect(() => {
    setShuffled(arrShuffle(data).splice(0, 32));
  }, []);

  const appearSelect = () => {
    setHidden(true);
    setTimeout(() => {
      setHidden(false);
    }, 800);
  };

  const selectItem = (data, current, length) => {
    if (length % 2 !== 0) {
      // length가 홀수 일때 마지막 데이터 그냥 더함
      if (current + 4 <= length) {
        setStage(current + 2);
        setCurrentRoundSelected([...currentRoundSelected, data]);
        appearSelect();
      } else {
        console.log("next");

        setRound(round + 1);
        setStage(0);
        addOddSelect(data, selected.pop());
        setCurrentRoundSelected([]);
        appearSelect();
      }
    } else {
      // 짝수
      if (current + 4 <= length) {
        setStage(current + 2);
        setCurrentRoundSelected([...currentRoundSelected, data]);
        appearSelect();
      } else {
        console.log("next round");

        setRound(round + 1);
        setStage(0);
        addSelect(data);
        setCurrentRoundSelected([]);
        appearSelect();
      }
    }
  };

  const roundArray = ["32강", "16강", "8강", "4강", "결승", "결과"];

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "1rem"
        }}
      >
        <h3> 이상형 월드컵</h3>
        <div style={{ fontWeight: "600" }}> {roundArray[round]}</div>
        {shuffled && (
          <div style={{ display: "flex", justifyContents: "center" }}>
            {/* 1라운드 */}
            {!hidden && round === 0 && (
              <>
                <Item
                  data={shuffled[stage]}
                  clickFn={selectItem}
                  stage={stage}
                  length={shuffled.length}
                />
                <Versus />
                <Item
                  data={shuffled[stage + 1]}
                  clickFn={selectItem}
                  stage={stage}
                  length={shuffled.length}
                />
              </>
            )}
            {/* 2라운드 */}
            {!hidden && round > 0 && selected.length > 1 && (
              <>
                <Item
                  data={selected[stage]}
                  clickFn={selectItem}
                  stage={stage}
                  length={selected.length}
                />
                <div style={{ margin: "120px -0.5rem 0 -0.5rem" }}>VS</div>
                <Item
                  data={selected[stage + 1]}
                  clickFn={selectItem}
                  stage={stage}
                  length={selected.length}
                />
              </>
            )}
            {/* 선택시화면 */}
            {hidden && (
              <>
                {currentRoundSelected.length > 0 ? (
                  <Item
                    data={currentRoundSelected[currentRoundSelected.length - 1]}
                    clickFn={() => {}}
                    stage={stage}
                    length={selected.length}
                  />
                ) : (
                  <div style={{ marginTop: "5rem", fontWeight: "600" }}>
                    다음 라운드
                  </div>
                )}
              </>
            )}
            {/* 최종화면 */}
            {!hidden && round > 0 && selected.length === 1 && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>{name}님의 이상형은</h3>
                <Item
                  data={selected[stage]}
                  clickFn={() => {}}
                  stage={stage}
                  length={selected.length}
                />
                <div>
                  <p>2등</p>
                  <Item
                    data={
                      oldSelected[oldSelected.length - 2].filter(
                        item => selected[stage].name !== item.name
                      )[0]
                    }
                    clickFn={() => {}}
                    stage={stage}
                    length={selected.length}
                  />
                </div>
                <div>
                  <p>공동 3등</p>
                  {oldSelected[oldSelected.length - 3]
                    .filter(
                      item =>
                        selected[stage].name !== item.name &&
                        item.name !==
                          oldSelected[oldSelected.length - 2].filter(
                            item => selected[stage].name !== item.name
                          )[0].name
                    )
                    .map(item => (
                      <Item
                        data={item}
                        clickFn={() => {}}
                        stage={stage}
                        length={selected.length}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ItemSelector;
