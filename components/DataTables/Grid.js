import styled, { css } from "styled-components";

export const Row = styled.div`
  display: flex;
  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
  }
`;
export const Column = styled.div`
  width: ${props => props.ratio * 9.09}%;
  padding-left: 8px;
  padding-right: 8px;
  @media screen and (max-width: 500px) {
    width: 50%;
  }
`;

Column.defaultProps = { ratio: 0.5 };

export default { Row, Column };
