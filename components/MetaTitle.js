import NextHead from "next/head";

export default ({ data }) => (
  <NextHead>
    <title>{data ? data + " | " : ""}Garbage Collection</title>
  </NextHead>
);
