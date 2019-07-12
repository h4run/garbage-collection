import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
`;

const Outer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  div {
    display: inline-block;
    position: absolute;
    left: 6px;
    width: 13px;
    background: #b8bfca;
    animation: ${animate} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    &:nth-child(1) {
      left: 6px;
      animation-delay: -0.24s;
    }
    &:nth-child(2) {
      left: 26px;
      animation-delay: -0.12s;
    }
    &:nth-child(3) {
      left: 45px;
      animation-delay: 0;
    }
  }
`;

const Loading = () => (
  <Outer className="loading">
    <div />
    <div />
    <div />
  </Outer>
);

export default Loading;
