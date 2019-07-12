import { useState, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import DatePicker from "react-datepicker";

export default () => {
  const [date, setDate] = useState(new Date());
  const datepicker = useRef();
  return (
    <Container>
      <FilterArea>
        <Link href="/map">
          <a className="map-link">
            <i className="icon-map" />
          </a>
        </Link>
        <DatePicker
          ref={datepicker}
          selected={date}
          onChange={setDate}
          dateFormat="dd.MM.yyyy"
        />
        <a
          className="datepicker-btn"
          href="javascript:;"
          onClick={() => {
            datepicker.current.setOpen(!datepicker.current.state.open);
          }}
        >
          <i className="icon-calendar" />
        </a>
        <a className="submit" href="javascript:;">
          <i className="icon-long-arrow-right" />
        </a>
      </FilterArea>
      <Add>
        <i className="icon-plus" />
      </Add>
    </Container>
  );
};

const FilterArea = styled.div`
  display: flex;
  align-items: center;

  .map-link {
    .icon-map {
      font-size: 22px;
      margin-right: 10px;
    }
    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  }
  .react-datepicker-wrapper input,
  .datepicker-btn,
  .submit {
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    height: 33px;
    display: flex;
  }
  .react-datepicker-wrapper input,
  .datepicker-btn {
    background-color: #f2f2f2;
    border-color: #ccd0d9;
  }
  .datepicker-btn {
    width: 36px;
    i {
      margin: auto;
    }
  }
  .react-datepicker-wrapper input {
    width: 206px;
    padding-left: 12px;
    padding-right: 12px;
  }

  .submit {
    width: 40px;
    margin-left: 5px;
    background-color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primaryDark};
    color: white;
    &:hover {
      background-color: ${props => props.theme.colors.primaryDark};
    }
    i {
      margin: auto;
    }
  }
`;

const Add = styled.a.attrs({ href: "javascript:;" })`
  width: 50px;
  display: flex;
  background-color: #049c50;
  border-radius: 50%;
  &:hover {
    background-color: #035f31;
  }
  i {
    margin: auto;
    color: white;
  }
  &:before {
    content: "";
    padding-top: 100%;
    display: block;
  }
`;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
`;
