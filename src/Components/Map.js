import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";

function Map({ dir }) {
  const GoogleMapExample = withGoogleMap(() => (
    <GoogleMap
      defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
      defaultZoom={1}
    >
      <DirectionsRenderer directions={dir} />
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
