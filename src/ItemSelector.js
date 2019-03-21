import React, { useState, useEffect } from "react";
import Item from "./Item";

const arrShuffle = arr => {
  return arr.sort(() => {
    return Math.random() - Math.random();
  });
};

const ItemSelector = ({ data, name }) => {
  const [stage, setStage] = useState(0);
  const [round, setRound] = useState(0);
  const [hidden, setHidden] = useState(false);

  const [shuffled, setShuffled] = useState(null);

  const [currentRoundSelected, setCurrentRoundSelected] = useState([]);
  const [selected, setSelected] = useState([]);

  const addSelect = lastData => {
    // 마지막 선택 포함하여 셔플해서 다음단계로 넘김
    const newShuffle = arrShuffle([...currentRoundSelected, lastData]);
    setSelected(newShuffle.splice(0, 32));
  };

  const addOddSelect = (lastData, currentData) => {
    // 마지막 선택 포함하여 셔플해서 다음단계로 넘김
    const newShuffle = arrShuffle([
      ...currentRoundSelected,
      currentData,
      lastData
    ]);
    setSelected(newShuffle);
  };

  useEffect(() => {
    setShuffled(arrShuffle(data));
  }, []);

  const appearSelect = () => {
    setHidden(true);
    setTimeout(() => {
      setHidden(false);
    }, 800);
  };

  const selectItem = (data, current, length) => {
    console.log(current + 4);
    console.log(length);

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

  const roundArray = ["32강", "16강", "8강", "4강", "준결승", "결승"];

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "3rem"
        }}
      >
        <h3> 이상형 월드컵</h3>
        <h4> {roundArray[round]}</h4>

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
                <div style={{ marginTop: "120px" }}>VS</div>
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
                <div style={{ marginTop: "120px" }}>VS</div>
                <Item
                  data={selected[stage + 1]}
                  clickFn={selectItem}
                  stage={stage}
                  length={selected.length}
                />
              </>
            )}
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
                  <div style={{ marginTop: "5rem" }}>다음 라운드</div>
                )}
              </>
            )}
            {/* 최종화면 */}
            {!hidden && round > 0 && selected.length === 1 && (
              <>
                <h3>{name}님의 이상형은</h3>
                <Item
                  data={selected[stage]}
                  clickFn={() => {}}
                  stage={stage}
                  length={selected.length}
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ItemSelector;
