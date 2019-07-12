import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import vehicles from "../../../../data/vehicles.json";

export default ({ data, closeMe, onSelect, isVisible }) => (
  <Outer>
    <CSSTransition
      in={isVisible}
      timeout={200}
      unmountOnExit
      classNames="modal"
    >
      <Container>
        <div className="backdrop" onClick={closeMe}></div>

        <div className="content-wrapper">
          <div className="header">
            <h2>{[data.Vehicle, data.Name, data.Driver].join(" - ")}</h2>
            <a href="javascript:;" onClick={closeMe}>
              <i className="icon-close"></i>
            </a>
          </div>
          <div className="content">
            <div className="list-wrapper">
              <h3 className="title">Change Vehicle</h3>
              <ul>
                {vehicles
                  .filter(v => v.Name !== data.Vehicle)
                  .map(v => (
                    <li
                      key={v.Name}
                      onClick={() => {
                        if (onSelect) onSelect(data.Id, v.Name);
                      }}
                    >
                      {v.Name}
                      <a href="javascript:;" className="swap-btn">
                        <i className="icon-replace" />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </CSSTransition>
  </Outer>
);

const Outer = styled.div`
  .modal-enter {
    opacity: 0;
  }
  .modal-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }
  .modal-exit {
    opacity: 1;
  }
  .modal-exit-active {
    opacity: 0;
    transition: opacity 200ms ease-in;
  }
`;

const Container = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;

  &,
  .backdrop {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .backdrop {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    z-index: 2;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px 14px 20px 30px;
    border-bottom: 1px solid #f2f2f2;
    .icon-close {
      padding: 5px;
      font-size: 14px;
      color: #ccc;
    }
  }
  .content  {
    padding: 15px;
  }

  .list-wrapper {
    background-color: #e9edf2;
    .title {
      font-size: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .title,
    ul li {
      height: 44px;
      padding-left: 24px;
      padding-right: 24px;
    }
    ul {
      margin: 0;
      padding: 0;
      font-weight: 300;
      list-style: none;
      font-size: 14px;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #f2f2f2;
        cursor: pointer;
        &:hover {
          background-color: #d0dded;
        }
      }
      .swap-btn  {
        border-radius: 5px;
        border: 1px solid ${props => props.theme.colors.primaryDark};
        background-color: ${props => props.theme.colors.primary};
        height: 30px;
        width: 30px;
        display: flex;
        color: white;
        i {
          margin: auto;
        }
      }
    }
  }

  .content-wrapper  {
    min-width: 600px;
    background-color: white;
    z-index: 5;
    position: relative;
  }
`;
