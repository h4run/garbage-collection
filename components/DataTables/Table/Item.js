import styled, { css } from "styled-components";
import { useState } from "react";

import Grid from "../Grid";

import Popover from "./Popover";
import Modal from "./Modal";

export default ({ data, onChangeVehicle }) => {
  const [popoverIsShowing, showPopover] = useState(false);
  const [modalIsShowing, showModal] = useState(false);

  const closePopover = () => showPopover(false);
  const closeModal = () => showModal(false);
  const openModal = () => {
    closePopover();
    showModal(true);
  };
  const _handleSelectVehicle = (Id, Vehicle) => {
    closeModal();
    onChangeVehicle(Id, Vehicle);
  };

  return (
    <>
      <Row>
        {Object.keys(data)
          .filter(label => label !== "Id")
          .map(label => {
            const val =
              label === "Performance"
                ? Object.values(data[label]).join(" / ")
                : data[label];
            return (
              <Column
                key={val}
                label={label}
                ratio={
                  ["Vehicle", "Time", "Performance"].includes(label) ? 1 : 2
                }
              >
                <LabelWrapper>
                  <Label
                    label={label}
                    val={val}
                    {...(label === "Vehicle"
                      ? { onClick: () => showPopover(true) }
                      : {})}
                  >
                    {val || "-"}
                  </Label>
                  {popoverIsShowing && label === "Vehicle" && (
                    <Popover closeMe={closePopover} openModal={openModal} />
                  )}
                </LabelWrapper>
              </Column>
            );
          })}
        <Column>
          <RouteBtn>
            <img src="/static/icon-route.png" />
          </RouteBtn>
        </Column>
      </Row>
      <Modal
        isVisible={modalIsShowing}
        data={data}
        closeMe={() => showModal(false)}
        onSelect={_handleSelectVehicle}
      />
    </>
  );
};

const RouteBtn = styled.a.attrs({ href: "javascript:;" })``;

const Column = styled(Grid.Column)`
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 500px) {
    height: auto;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    &:nth-child(-n + 6):after {
      content: "";
      border-top: 1px solid #ddd;
      margin-top: 10px;
    }
    &:nth-child(2n + 1) {
      border-right: 1px solid #eee;
    }
    &:before {
      content: attr(label);
    }
  }
`;

const Row = styled(Grid.Row)`
  margin-bottom: 5px;
  border: 1px solid transparent;
  background-color: white;
  &:hover {
    border-color: #ddd;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: 500px) {
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 10px;
  }
`;

const LabelWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  position: relative;
`;

const Label = styled.span`
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  font-weight: 300;
  font-size: 14px;

  @media screen and (max-width: 500px) {
    padding-left: 0;
  }

  ${props =>
    props.onClick &&
    css`
      &:hover {
        background-color: #f8f8f8;
        cursor: pointer;
        &:after {
          font-family: "icomoon";
          content: "\\\e905";
          margin-right: 10px;
        }
      }
      user-select: none;
      padding-left: 10px;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `}
  ${({ label }) =>
    label === "Name" &&
    css`
      @media screen and (min-width: 500px) {
        font-weight: 500;
        color: ${props => props.theme.colors.primaryDark};
      }
    `}


  ${({ label, val }) =>
    label === "Status" &&
    val === "Dispatched" &&
    css`
      color: green;
    `}
`;
