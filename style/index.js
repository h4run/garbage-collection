import { createGlobalStyle } from "styled-components";

import "normalize.css";
import "../static/icomoon/style.css";
import "../static/fonts/sofia-pro/fontstyle.css";
import "react-datepicker/dist/react-datepicker.css";

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    color: ${props => props.theme.colors.primary};
    background-color: #e9edf3;
    font-family: 'Sofia Pro';
  }
  html,
  body,
  #__next {
    height: 100%;
  }
`;

export default GlobalStyle;
