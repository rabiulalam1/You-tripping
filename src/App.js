import React, { useState } from "react";
import { withScriptjs } from "react-google-maps";
import "./App.css";

//importing Componenets
import ProgrammingQuote from "./Components/Programming-quote";
import Map from "./Components/Map";
import PlacesAutocomplete from "./Components/PlacesAutoComplete";
import RouteDetail from "./Components/RouteDetails";

function App() {
  const [origin, setOrigin] = useState({ lat: 40.756795, lng: -73.954298 });
  const [destination, setDestination] = useState({
    lat: 40.756795,
    lng: -73.954298,
  });

  //User Location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    }
  }
  getLocation();
  function showPosition(position) {
    setOrigin({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  //Google Map Loader
  const MapLoader = withScriptjs(() => Map({ origin, destination }));

  //Return starts here
  return (
    <div>
      <ProgrammingQuote />
      {/* <PlacesAutocomplete setDestination={setDestination} />
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key="
        loadingElement={<div style={{ height: `250px` }} />}
      />
      <RouteDetail origin={origin} destination={destination} /> */}
    </div>
  );
}

export default App;
