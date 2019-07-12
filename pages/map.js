import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Timeline from "../components/Timeline";
import MapStats from "../components/MapStats";

import data from "../data/maps.json";

const MapComponent = compose(
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      const waypoints = data[0].routes
        .filter((a, index) => index > 0 && index != data[0].routes.length - 1)
        .map(r => ({ location: r.position, stopover: true }));

      DirectionsService.route(
        {
          origin: data[0].routes[0].position,
          destination: data[0].routes[data[0].routes.length - 1].position,
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });

            const locations = result.routes[0].legs.map(d => ({
              lat: d.end_location.lat(),
              lng: d.end_location.lng()
            }));
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(({ currentRouteIndex, directions }) => (
  <GoogleMap
    defaultOptions={{
      mapTypeControl: false,
      zoomControl: false,
      fullscreenControl: false,
      streetViewControl: false
    }}
  >
    {directions && (
      <DirectionsRenderer
        defaultOptions={{
          suppressMarkers: true
        }}
        directions={directions}
      />
    )}
    {data[0].routes.map(({ position }, index) => {
      let markerIcon = "garbage";
      let markerSize = 30;
      if (index === 0) {
        markerIcon = "start";
        markerSize = 60;
      } else if (index === data[0].routes.length - 1) {
        markerIcon = "finish";
        markerSize = 50;
      } else if (currentRouteIndex >= index) {
        markerIcon = "garbage-ok";
      }
      return (
        <Marker
          zIndex={1}
          position={position}
          icon={{
            url: `/static/${markerIcon}.svg`,
            scaledSize: { width: markerSize, height: markerSize }
          }}
          key={Object.values(position).join(", ")}
        />
      );
    })}

    {/*truck*/}
    <Marker
      zIndex={999}
      icon={{
        url: `/static/truck.svg`,
        scaledSize: { width: 42, height: 42 }
      }}
      position={data[0].routes[currentRouteIndex].position}
    />
  </GoogleMap>
));

const Map = () => {
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const handleChangeTimeLine = index => setCurrentRouteIndex(index);

  const statsData = {
    collected:
      currentRouteIndex +
      (currentRouteIndex === data[0].routes.length - 1 ? -1 : 0),
    total: data[0].routes.length - 2
  };

  return (
    <Layout title="Map">
      <Container>
        <MapWrapper>
          <MapStats {...statsData} />
          <MapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?language=en&v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDUJo2mR4OaZW2m6xDsXkCWxz6sw5_Dv10"
            loadingElement={<Loading />}
            containerElement={<MapContainer />}
            mapElement={<MapElement />}
            currentRouteIndex={currentRouteIndex}
          />
        </MapWrapper>
        <Timeline routes={data[0].routes} onChange={handleChangeTimeLine} />
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  padding: 16px;
  padding-bottom: 35px;
  height: 100%;
  display: flex;
  flex-direction: column;
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

export default Map;
