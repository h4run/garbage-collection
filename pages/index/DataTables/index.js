import styled from "styled-components";

import Filters from "./Filters";
import Table from "./Table";

import InitialData from "../../../data/routes.json";

export default class DataTables extends React.Component {
  state = { data: [...InitialData] };
  _filterOnChange = filters => {
    this.setState({
      data: [...InitialData].filter(row =>
        Object.keys(filters).every(label =>
          row[label].match(new RegExp(filters[label], "gi"))
        )
      )
    });
  };
  _handleChangeVehicle = (Id, Vehicle) => {
    this.setState(prevState => ({
      data: prevState.data.map(d => (d.Id === Id ? { ...d, Vehicle } : d))
    }));
  };
  render() {
    const { filter, data } = this.state;
    return (
      <Container>
        <Filters onChange={this._filterOnChange} />
        <Table data={data} onChangeVehicle={this._handleChangeVehicle} />
      </Container>
    );
  }
}

const Container = styled.div``;
