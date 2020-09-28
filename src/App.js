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
import Weather from "./Components/Weather";
import SkyScanner from "./Components/SkyScanner";
import Yelp from "./Components/Yelp";
import TicketMaster from "./Components/TicketMaster";
import Covid19 from "./Components/Covid19";

//importing local JSON
import airports from "./airports.json";

function App() {
  const [dir, setDir] = useState({});
  const [origin, setOrigin] = useState({ lat: 40.756795, lng: -73.954298 });
  const [destination, setDestination] = useState({
    lat: 40.756795,
    lng: -73.954298,
  });
  const [flightDetail, setFlightDetail] = useState({});
  // const [originAirport, setOriginAirport] = useState("MCO")
  // const [destinationAirport, setDestinationAirport] = useState("JFK")
  const [yelpRestaurants, setYelpRestaurants] = useState({});
  const [weather, setWeather] = useState({});
  const [events, setEvents] = useState({});
  const [covid19, setCovid19] = useState({});

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
          updateEvents(result);
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

          let destinationAirport = airports?.[0][destinationState] || "JFK";
          let orginAirport = airports?.[0][originState] || "MCO";
          updateFlightInfo(orginAirport, destinationAirport);
        } else {
          //console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  // *******************************SkyScanner*****************************************

  async function updateFlightInfo(fromAirport, toAirport) {
    await axios({
      method: "GET",
      url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${fromAirport}-sky/${toAirport}-sky/2020-09/2020-10`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.REACT_APP_RAPIDAPI_KEY}`,
        useQueryString: true,
      },
    })
      .then((response) => {
        console.log("SkyScanner :", response.data);
        setFlightDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // ************************************Yelp*******************************************

  async function updateRestaurent() {
    const searchRequest = {
      term: "restaurants",
      // location: `${dir.routes?.[0].legs[0].end_address}`,
      latitude: destination.lat,
      longitude: destination.lng,
      limit: 10,
      // price: "$$$",
    };

    const client = yelp.client(process.env.REACT_APP_YELP_KEY);

    await client
      .search(searchRequest)
      .then((response) => {
        setYelpRestaurants(response.jsonBody.businesses);
        console.log("Yelp Reataurant :", response.jsonBody.businesses);
      })
      .catch((e) => {
        //console.log(e);
      });
  }

  //*****************************************Weather***************************** */

  async function updateWeather() {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${destination.lat}&lon=${destination.lng}&units=imperial&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    console.log("Weather: ", res.data);
    setWeather(res.data);
  }

  // ************************************Ticket Master*******************************************

  async function updateEvents(dir) {
    let destinationState =
      dir.routes?.[0].legs[0].end_address
        .split(", ")
        .slice(-2)[0]
        .split(" ")[0]
        .toString() || "NY";
    //console.log(destinationState);
    let res = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sports,musics&stateCode=${destinationState}&sort=random&apikey=${process.env.REACT_APP_TICKETMASTER_KEY}`
    );
    console.log("TicketMaster Event: ", res.data._embedded.events);
    setEvents(res.data._embedded.events);
    updateCovid(destinationState);
  }

  //*****************************************Covid-19***************************** */

  async function updateCovid(destinationState) {
    let res = await axios.get(
      `https://api.covidtracking.com/v1/states/${destinationState}/current.json`
    );
    console.log("Covid19: ", res.data);
    setCovid19(res.data);
  }

  useEffect(() => {
    //console.log(dir, destination);
    updateDirections();
    //updateFlightInfo();
    updateRestaurent();
    updateWeather();
    //updateEvents();
  }, [destination]);

  //Google Map Loader
  const MapLoader = withScriptjs(() => Map({ dir }));
  let url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`;

  // Return starts here

  return (
    <div>
      {/* <ProgrammingQuote /> */}

      <PlacesAutocomplete setDestination={setDestination} />

      <MapLoader googleMapURL={url} loadingElement={<div />} />

      <RouteDetail dir={dir} />

      <Weather weather={weather} />

      <SkyScanner flightDetail={flightDetail} />

      <Yelp yelp={yelpRestaurants} />

      <TicketMaster events={events} />

      <Covid19 covid19={covid19} />
    </div>
  );
}

export default App;
