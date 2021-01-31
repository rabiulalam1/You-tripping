import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';
import './Map.css';

function Map({ dir }) {
  const GoogleMapExample = withGoogleMap(() => (
    <GoogleMap
      defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
      defaultZoom={8}
    >
      <DirectionsRenderer directions={dir} />
    </GoogleMap>
  ));

  return (
    <div>
      <GoogleMapExample
        containerElement={<div className="mapContainer" />}
        mapElement={<div className="map" />}
      />
    </div>
  );
}

export default Map;
