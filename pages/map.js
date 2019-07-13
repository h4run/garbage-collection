import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

import MetaTitle from "../components/MetaTitle";
import Loading from "../components/Loading";
import Timeline from "../components/Timeline";
import GoogleMap from "../components/GoogleMap";
import MapStats from "../components/MapStats";

import data from "../data/maps.json";

export default () => {
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const handleChangeTimeLine = index => setCurrentRouteIndex(index);

  const statsData = {
    collected:
      currentRouteIndex +
      (currentRouteIndex === data[0].routes.length - 1 ? -1 : 0),
    total: data[0].routes.length - 2
  };

  return (
    <Container>
      <MetaTitle data="Map" />
      <div className="nav">
        <Link href="/">
          <a className="back-btn">
            <i className="icon-arrow-left" />
            <span>back to routes</span>
          </a>
        </Link>
      </div>
      <MapWrapper>
        <MapStats {...statsData} />
        <GoogleMap
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?language=en&v=3.exp&libraries=geometry,drawing,places&key=" +
            process.env.GOOGLE_API_KEY
          }
          loadingElement={<Loading />}
          containerElement={<MapContainer />}
          mapElement={<MapElement />}
          currentRouteIndex={currentRouteIndex}
        />
      </MapWrapper>
      <Timeline routes={data[0].routes} onChange={handleChangeTimeLine} />
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
  padding-bottom: 35px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav {
    margin-bottom: 15px;
  }
  .back-btn {
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;

    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
    i {
      margin-right: 15px;
      font-size: 0.8em;
    }
    span {
      text-decoration: underline;
    }
  }
`;

const MapWrapper = styled.div`
  flex-grow: 1;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  position: relative;
  border-radius: 3px;
`;
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MapElement = styled.div`
  height: 100%;
`;
