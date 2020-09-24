import React, { useState, useEffect } from "react";
import axios from "axios";

const SkyScanner = () => {
  let [flightDetail, setFlightDetail] = useState({});

  useEffect(() => {
    async function flightLookUp() {
      let res = await axios({
        method: "GET",
        url:
          "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/MCO-sky/JFK-sky/2020-09-26",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "73ece737a2msh7d8823bf943c46bp144484jsncbe8b93833d6",
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
    flightLookUp();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default SkyScanner;
