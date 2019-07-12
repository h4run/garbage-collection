import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Layout from "../../components/Layout";

import Header from "./Header";
import Title from "./Title";
import DataTables from "./DataTables";

const Home = () => (
  <Layout title="Routes">
    <Container>
      <Header />
      <Title />
      <DataTables />
    </Container>
  </Layout>
);

const Container = styled.div`
  padding: 46px 34px 70px 34px;
  overflow-y: scroll;
  height: 100%;
`;

export default Home;
