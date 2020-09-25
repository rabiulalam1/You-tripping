/*global google*/
import React, { useState, useEffect } from "react";
import { withScriptjs } from "react-google-maps";
import "./App.css";

//importing Componenets
import ProgrammingQuote from "./Components/Programming-quote";
import Map from "./Components/Map";
import PlacesAutocomplete from "./Components/PlacesAutoComplete";
import RouteDetail from "./Components/RouteDetails";
import SkyScanner from "./Components/SkyScanner";

function App() {
  const [dir, setDir] = useState({});
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

  const updateDirections = () => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          //console.log(result);
          setDir(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  useEffect(() => {
    updateDirections();
  }, [destination]);
  //Google Map Loader
  const MapLoader = withScriptjs(() => Map({ dir }));
  let url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`;
  //Return starts here
  return (
    <div>
      <ProgrammingQuote />

      <PlacesAutocomplete setDestination={setDestination} />

      <MapLoader
        googleMapURL={url}
        loadingElement={<div style={{ height: `250px` }} />}
      />

      <RouteDetail dir={dir} />

      <SkyScanner dir={dir} />
    </div>
  );
}

export default App;
