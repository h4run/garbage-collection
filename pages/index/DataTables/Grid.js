import styled, { css } from "styled-components";

export const Row = styled.div`
  display: flex;
`;
export const Column = styled.div`
  width: ${props => props.ratio * 9.09}%;
  padding-left: 8px;
  padding-right: 8px;
`;

Column.defaultProps = { ratio: 0.5 };

export default { Row, Column };
