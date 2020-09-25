/*global google*/
import React, { useState, useEffect } from "react";
import { withScriptjs } from "react-google-maps";
import axios from "axios";
import yelp from "yelp-fusion";
import "./App.css";

//importing Componenets
import ProgrammingQuote from "./Components/Programming-quote";
import Map from "./Components/Map";
import PlacesAutocomplete from "./Components/PlacesAutoComplete";
import RouteDetail from "./Components/RouteDetails";

//importing local JSON
import airports from "./airports.json";

function App() {
  const [dir, setDir] = useState({});
  const [origin, setOrigin] = useState({ lat: 40.756795, lng: -73.954298 });
  const [destination, setDestination] = useState({
    lat: 40.756795,
    lng: -73.954298,
  });
  const [fromAirport, setFromAirport] = useState("MCO");
  const [toAirport, setToAirport] = useState("JFK");
  const [flightDetail, setFlightDetail] = useState({});
  const [yelpRestaurants, setYelpRestaurants] = useState({});

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
          setDir(result);
          let originState = result.routes?.[0].legs[0].start_address
            .split(", ")
            .slice(-2)[0]
            .split(" ")[0]
            .toString();
          let destinationState = result.routes?.[0].legs[0].end_address
            .split(", ")
            .slice(-2)[0]
            .split(" ")[0]
            .toString();

          let destinationAirport = airports?.[0][destinationState];
          let orginAirport = airports?.[0][originState];
          setFromAirport(orginAirport);
          setToAirport(destinationAirport);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  // *******************************SkyScanner*****************************************
  function updateFlightInfo() {
    axios({
      method: "GET",
      url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${fromAirport}-sky/${toAirport}-sky/2020-10/2020-10`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.REACT_APP_RAPIDAPI_KEY}`,
        useQueryString: true,
      },
    })
      .then((response) => {
        console.log(response.data);
        setFlightDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // ************************************Yelp*******************************************

  function updateRestaurent() {
    const searchRequest = {
      term: "restaurants",
      // location: `${dir.routes?.[0].legs[0].end_address}`,
      latitude: destination.lat,
      longitude: destination.lng,
      limit: 5,
      // price: "$$$",
    };

    const client = yelp.client(process.env.REACT_APP_YELP_KEY);

    client
      .search(searchRequest)
      .then((response) => {
        setYelpRestaurants(response.jsonBody.businesses);
        //console.log(response.jsonBody.businesses);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    updateDirections();
    updateFlightInfo();
    updateRestaurent();
  }, [destination]);
  //Google Map Loader
  const MapLoader = withScriptjs(() => Map({ dir }));
  let url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`;
  // Return starts here

  return (
    <div>
      <ProgrammingQuote />

      <PlacesAutocomplete setDestination={setDestination} />

      <MapLoader
        googleMapURL={url}
        loadingElement={<div style={{ height: `250px` }} />}
      />

      <RouteDetail dir={dir} />
    </div>
  );
}

export default App;
