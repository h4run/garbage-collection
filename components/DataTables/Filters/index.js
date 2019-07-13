import styled from "styled-components";

import Grid from "../Grid";

import Filter from "./Filter";

import routes from "../../../data/routes.json";

export default class Filters extends React.Component {
  state = { data: {} };
  handleOnChange = async (label, value) => {
    const data = { ...this.state.data, [label]: value };
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
    this.setState({ data });
  };
  render() {
    const { data } = this.state;
    return (
      <Row>
        {Object.keys(routes[0])
          .filter(label => label !== "Id")
          .map(label => (
            <Column
              key={label}
              ratio={["Vehicle", "Time", "Performance"].includes(label) ? 1 : 2}
            >
              <Filter
                onChange={value => {
                  this.handleOnChange(label, value);
                }}
                label={label}
                isEditable={["Vehicle", "Performance"].includes(label)}
                searchDisabled={label === "Performance"}
                {...(label === "Time" ? { sortIcon: "icon-sort-desc" } : {})}
              />
            </Column>
          ))}
        <Column />
      </Row>
    );
  }
}

const Row = styled(Grid.Row)`
  @media screen and (max-width: 500px) {
    margin-left: -8px;
    margin-right: -8px;
  }
`;
const Column = styled(Grid.Column)`
  @media screen and (max-width: 500px) {
    &:nth-child(n + 3) {
      margin-top: 20px;
    }
  }
`;
