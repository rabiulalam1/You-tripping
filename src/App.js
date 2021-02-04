/*global google*/
import React, { useState, useEffect } from 'react';
import { withScriptjs } from 'react-google-maps';
import axios from 'axios';
// import yelp from 'yelp-fusion';
import yelp from './yelp-fusion/lib';

import './App.css';

//importing Componenets
import ProgrammingQuote from './Components/Programming-quote';
import Map from './Components/Map';
import PlacesAutocomplete from './Components/PlacesAutoComplete';
import RouteDetail from './Components/RouteDetails';
import Weather from './Components/Weather';
import SkyScanner from './Components/SkyScanner';
import Yelp from './Components/Yelp';
import TicketMaster from './Components/TicketMaster';
import Covid19 from './Components/Covid19';

//importing local JSON
import airports from './airports.json';

function App() {
  const [dir, setDir] = useState({});
  const [origin, setOrigin] = useState({ lat: 40.756795, lng: -73.954298 });
  const [destination, setDestination] = useState({
    lat: 40.756795,
    lng: -73.954298,
  });
  const [flightDetail, setFlightDetail] = useState({});
  const [yelpRestaurants, setYelpRestaurants] = useState({});
  const [weather, setWeather] = useState({});
  const [events, setEvents] = useState({});
  const [covid19, setCovid19] = useState({});

  //User Location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  };

  const showPosition = (position) => {
    setOrigin({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  getLocation();
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
            .split(', ')
            .slice(-2)[0]
            .split(' ')[0]
            .toString();
          let destinationState = result.routes?.[0].legs[0].end_address
            .split(', ')
            .slice(-2)[0]
            .split(' ')[0]
            .toString();

          let destinationAirport = airports?.[0][destinationState] || 'JFK';
          let orginAirport = airports?.[0][originState] || 'MCO';
          updateFlightInfo(orginAirport, destinationAirport);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  // *******************************SkyScanner*****************************************

  const updateFlightInfo = async (fromAirport, toAirport) => {
    let date = new Date();
    // ${date.getFullYear() + "-" + (date.getMonth() + 2)}
    await axios({
      method: 'GET',
      url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${fromAirport}-sky/${toAirport}-sky/${
        date.getFullYear() + '-0' + (date.getMonth() + 1)
      }`,
      params: {
        inboundpartialdate: `${
          date.getFullYear() + '-0' + (date.getMonth() + 2)
        }`,
      },
      headers: {
        'x-rapidapi-host':
          'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.REACT_APP_RAPIDAPI_KEY}`,
      },
    })
      .then((res) => {
        setFlightDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ************************************Yelp*******************************************

  // const updateRestaurent = async () => {
  //   const searchRequest = {
  //     term: 'restaurants',
  //     // location: `${dir.routes?.[0].legs[0].end_address}`,
  //     latitude: destination.lat,
  //     longitude: destination.lng,
  //     limit: 10,
  //     // price: "$$$",
  //   };

  //   const client = yelp.client(process.env.REACT_APP_YELP_KEY);

  //   await client
  //     .search(searchRequest)
  //     .then((response) => {
  //       setYelpRestaurants(response.jsonBody.businesses);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  const updateRestaurent = async () => {
    const client = yelp.client(process.env.REACT_APP_YELP_KEY);

    await client
      .search({
        term: 'restaurants',
        latitude: destination.lat,
        longitude: destination.lng,
      })
      .then((response) => {
        setYelpRestaurants(response.jsonBody.businesses);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //*****************************************Weather***************************** */

  const updateWeather = async () => {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${destination.lat}&lon=${destination.lng}&units=imperial&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );

    setWeather(res.data);
  };

  // ************************************Ticket Master*******************************************

  const updateEvents = async (dir) => {
    let destinationState =
      dir.routes?.[0].legs[0].end_address
        .split(', ')
        .slice(-2)[0]
        .split(' ')[0]
        .toString() || 'NY';

    let res = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sports,musics&stateCode=${destinationState}&sort=random&apikey=${process.env.REACT_APP_TICKETMASTER_KEY}`
    );

    setEvents(res.data._embedded.events);
    updateCovid(destinationState);
  };

  //*****************************************Covid-19***************************** */

  const updateCovid = async (destinationState) => {
    let res = await axios.get(
      `https://api.covidtracking.com/v1/states/${destinationState}/current.json`
    );

    setCovid19(res.data);
  };

  useEffect(() => {
    updateDirections();
    updateRestaurent();
    updateWeather();
  }, [destination]);

  //Google Map Loader
  const MapLoader = withScriptjs(() => Map({ dir }));
  let url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`;

  // Return starts here

  return (
    <div>
      {/* <ProgrammingQuote /> */}

      <PlacesAutocomplete setDestination={setDestination} />
      <div className="mapSection">
        <MapLoader
          style={{ position: 'relative' }}
          googleMapURL={url}
          loadingElement={<div />}
        />
        <RouteDetail dir={dir} />
      </div>

      <Weather weather={weather} />

      <SkyScanner flightDetail={flightDetail} />

      <Yelp yelp={yelpRestaurants} />

      <TicketMaster events={events} />

      <Covid19 covid19={covid19} />
    </div>
  );
}

export default App;
