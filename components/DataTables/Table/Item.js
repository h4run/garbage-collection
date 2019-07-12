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
  background-color: white;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Row = styled(Grid.Row)`
  margin-bottom: 5px;
  border: 1px solid transparent;

  &:hover {
    border-color: #ddd;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
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
    label === "Name"
      ? css`
          font-weight: 500;
          color: ${props => props.theme.colors.primaryDark};
        `
      : css`
          font-weight: 300;
          font-size: 14px;
        `}

  ${({ label, val }) =>
    label === "Status" &&
    val === "Dispatched" &&
    css`
      color: green;
    `}
`;
