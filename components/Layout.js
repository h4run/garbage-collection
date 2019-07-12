import Head from "./Head";
import GlobalStyle from "../style";

export default ({ title, children }) => (
  <>
    <Head title={`${title ? title + " | " : ""}Evreka`} />
    <GlobalStyle />
    {children}
  </>
);
