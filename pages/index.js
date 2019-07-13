import React from "react";
import Link from "next/link";
import styled from "styled-components";

import MetaTitle from "../components/MetaTitle";
import DataTables from "../components/DataTables";
import Header from "../components/Header";
import Title from "../components/Title";

export default () => (
  <Container>
    <MetaTitle data="Routes" />
    <Header />
    <Title />
    <DataTables />
  </Container>
);

const Container = styled.div`
  padding: 46px 34px 70px 34px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  @media screen and (max-width: 500px) {
    padding: 25px 15px 40px 15px;
  }
`;
