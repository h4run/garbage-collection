import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Item from "./Item";

export default ({ data, onChangeVehicle }) => (
  <Container>
    <TransitionGroup>
      {data.map(d => (
        <CSSTransition key={d.Id} timeout={500} classNames="item">
          <Item data={d} onChangeVehicle={onChangeVehicle} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  </Container>
);

const Container = styled.div`
  margin-top: 20px;
  .item-enter {
    opacity: 0;
  }
  .item-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  .item-exit {
    opacity: 1;
  }
  .item-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }
`;
