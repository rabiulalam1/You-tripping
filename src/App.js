import React, { useState } from "react";
import { withScriptjs } from "react-google-maps";
import "./App.css";

//importing Componenets
import ProgrammingQuote from "./Components/Programming-quote";
import Map from "./Components/Map";
import PlacesAutocomplete from "./Components/PlacesAutoComplete";
import RouteDetail from "./Components/RouteDetails";
import SkyScanner from "./Components/SkyScanner";

function App() {
  const [origin, setOrigin] = useState({ lat: 40.756795, lng: -73.954298 });
  const [destination, setDestination] = useState({
    lat: 40.756795,
    lng: -73.954298,
  });
  const [routeInfo, setRouteInfo] = useState({});
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
  console.log(routeInfo.distance);
  //Google Map Loader
  const MapLoader = withScriptjs(() => Map({ origin, destination }));
  console.log(process.env);
  //Return starts here
  return (
    <div>
      <ProgrammingQuote />

      <PlacesAutocomplete setDestination={setDestination} />

      <MapLoader
        googleMapURL=`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`
        loadingElement={<div style={{ height: `250px` }} />}
      />

      <RouteDetail
        origin={origin}
        destination={destination}
        setRouteInfo={setRouteInfo}
      />

      <SkyScanner />
    </div>
  );
}

export default App;
