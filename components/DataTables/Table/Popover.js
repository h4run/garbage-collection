import { useRef } from "react";
import styled from "styled-components";

import { useOutsideClick } from "../../../utils";

export default ({ closeMe, openModal }) => {
  const ref = useRef();

  useOutsideClick(ref, closeMe);
  return (
    <>
      <Container ref={ref}>
        <Item onClick={openModal}>Change</Item>
        <Item passive>Swap</Item>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: calc(100% - 25px);
  border: 1px solid #c5c5c5;
  background-color: #fdfdfd;
  z-index: 5;
  @media screen and (max-width: 500px) {
    right: 0;
    left: auto;
  }
`;

const Item = styled.a.attrs({ href: "javascript:;" })`
  display: block;
  padding-left: 10px;
  padding-right: 10px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 500;
  color: ${props => (props.passive ? "#a0a0a0" : "#6c6c6c")};
  & + & {
    border-top: 1px solid #c5c5c5;
  }
`;
