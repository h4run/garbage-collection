import styled from "styled-components";

const Item = ({ count, label, icon }) => (
  <div className="item">
    <img src={"/static/" + icon + ".svg"} alt="" />
    <span className="count">{count}</span>
    <span className="label">{label}</span>
  </div>
);

export default ({ collected, total }) => (
  <Container>
    <div className="stats">
      <Item count={collected} label="Collected" icon="garbage-ok" />
      <Item count={total - collected} label="Remaining" icon="garbage" />
    </div>
  </Container>
);

const Container = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
  background-color: white;
  z-index: 999;

  .stats {
    padding: 20px;
    width: 300px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    .item {
      display: flex;
      align-items: center;
      & + .item {
        margin-top: 15px;
      }
      .count {
        font-weight: bold;
        font-size: 24px;
        margin-right: 20px;
        width: 30px;
      }
      .label {
        font-weight: 300;
      }
      img {
        width: 30px;
        margin-bottom: 6px;
        margin-right: 10px;
      }
    }
  }
`;
