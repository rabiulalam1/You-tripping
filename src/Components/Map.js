/*global google*/
import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";

function Map({ origin, destination }) {
  let [directions, setDirections] = useState({});

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, []);

  const GoogleMapExample = withGoogleMap((props) => (
    <GoogleMap
      defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
      defaultZoom={12}
    >
      <DirectionsRenderer directions={directions} />
    </GoogleMap>
  ));

  return (
    <>
      <GoogleMapExample
        containerElement={<div style={{ height: `500px`, width: `500px` }} />}
        mapElement={<div style={{ height: `50%` }} />}
      />
    </>
  );
}

export default Map;
