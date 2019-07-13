import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";
import { compose, lifecycle } from "recompose";

import data from "../data/maps.json";

export default compose(
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
