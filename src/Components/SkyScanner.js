import React, { useEffect } from "react";
import axios from "axios";
import aiports from "./airports.json";

const SkyScanner = (props) => {
  let originState = props.dir.routes?.[0].legs[0].start_address
    .split(", ")
    .slice(-2)[0]
    .split(" ")[0];
  let destinationState = props.dir.routes?.[0].legs[0].end_address
    .split(", ")
    .slice(-2)[0]
    .split(" ")[0];
  let destinationAirpot = aiports?.[0].destinationState;
  let orginAirport = aiports?.[0].orginAirportState;
  useEffect(() => {
    async function flightLookUp() {
      console.log(aiports?.[0].destinationState);
      await axios({
        method: "GET",
        url:
          "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/MCO-sky/JFK-sky/2020-09-26",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key": "",
          useQueryString: true,
        },
        params: {
          inboundpartialdate: "2020-09-28",
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    flightLookUp;
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default SkyScanner;
