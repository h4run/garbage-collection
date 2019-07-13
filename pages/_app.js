import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import NextHead from "next/head";

import "rc-slider/assets/index.css";

import GlobalStyle from "../style";

const theme = {
  colors: {
    primary: "#495067",
    primaryDark: "#222d4f"
  }
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <NextHead>
          <meta charSet="UTF-8" />
          <link rel="icon" href="/static/favicon.ico" />
        </NextHead>
        <ThemeProvider theme={theme}>
          <>
            <Component {...pageProps} />
            <GlobalStyle />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
