import styled from "styled-components";

export default () => (
  <Container>
    <h3 className="title">Routes</h3>
    <a className="create-report" href="javascript:;">
      <i className="icon-file-text" />
      Create Report
    </a>
  </Container>
);

const Container = styled.div`
  margin-top: 20px;

  .title {
    font-size: 26px;
    margin: 0 0 18px 0;
  }
  .create-report {
    display: inline-flex;
    align-items: center;
    font-size: 16px;
    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
    i {
      margin-right: 5px;
      margin-bottom: 3px;
    }
  }
`;
