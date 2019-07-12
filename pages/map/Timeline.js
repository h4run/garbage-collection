import { useState } from "react";
import styled from "styled-components";
import Slider from "rc-slider";
import cx from "classnames";
import "rc-slider/assets/index.css";

import { getKeyByValue, useInterval } from "../../utils";

const convertTimeToMinutes = time =>
  new Date("1970-01-01T" + time + ":00Z").getTime() / 60000;

let stepIndexies = {};

export default ({ routes, onChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setRuningState] = useState(false);

  const startTime = convertTimeToMinutes(routes[0].time);
  const finishTime = convertTimeToMinutes(routes[routes.length - 1].time);
  const totalMinutes = finishTime - startTime;

  const marks = routes.reduce((acc, { time }, index) => {
    const step =
      (convertTimeToMinutes(time) - startTime) * (100 / totalMinutes);
    stepIndexies[step] = index;
    return { ...acc, [step]: time };
  }, {});

  const handleChangeStep = index => {
    setCurrentIndex(index);
    onChange(index);
  };

  useInterval(
    () => {
      const newCurrentIndex = currentIndex + 1;
      if (currentIndex === routes.length - 1) setRuningState(false);
      else {
        handleChangeStep(newCurrentIndex);
      }
    },
    isRunning ? 1500 : null
  );

  const isFinish = currentIndex === routes.length - 1;

  return (
    <Container>
      <a
        href="javascript:;"
        className="action-btn"
        onClick={() => {
          if (isFinish) {
            handleChangeStep(0);
            setRuningState(true);
          } else if (isRunning) {
            setRuningState(false);
          } else {
            setRuningState(true);
          }
        }}
      >
        <i
          className={cx({
            "icon-play": !isRunning & !isFinish,
            "icon-pause": isRunning && !isFinish,
            "icon-refresh": isFinish
          })}
        />
      </a>
      <Slider
        marks={marks}
        step={null}
        value={getKeyByValue(stepIndexies, currentIndex)}
        onChange={e => {
          const index = stepIndexies[e];
          handleChangeStep(index);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;

  .action-btn {
    margin-right: 35px;
    font-size: 30px;
    margin-top: 7px;
    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  }
`;
