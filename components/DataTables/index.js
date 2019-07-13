import styled from "styled-components";
import { useState } from "react";

import Filters from "./Filters";
import Table from "./Table";

import InitialData from "../../data/routes.json";

export default () => {
  const [data, setData] = useState(InitialData);
  const [filtersIsVisible, setFiltersIsVisible] = useState(false);
  const _toggleFilters = () => setFiltersIsVisible(!filtersIsVisible);
  const _filterOnChange = filters =>
    setData(
      InitialData.filter(row =>
        Object.keys(filters).every(label =>
          row[label].match(new RegExp(filters[label], "i"))
        )
      )
    );
  const _handleChangeVehicle = (Id, Vehicle) =>
    setData(data.map(d => (d.Id === Id ? { ...d, Vehicle } : d)));
  return (
    <Container>
      <FiltersContainer isVisible={filtersIsVisible}>
        <div className="toggle-btn">
          <a href="javascript:;" onClick={_toggleFilters}>
            {filtersIsVisible ? "- Hide" : "+ Show"} Filters
          </a>
        </div>
        <div className="wrap">
          <Filters onChange={_filterOnChange} />
        </div>
      </FiltersContainer>
      <Table data={data} onChangeVehicle={_handleChangeVehicle} />
    </Container>
  );
};

const Container = styled.div``;
const FiltersContainer = styled.div`
  margin-top: 30px;
  @media screen and (max-width: 500px) {
    margin-top: 15px;
    .wrap {
      display: ${props => (props.isVisible ? "block" : "none")};
    }
  }

  .toggle-btn {
    display: none;
  }
  @media screen and (max-width: 500px) {
    .toggle-btn {
      margin-top: -35px;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
`;
