import React, { useState, useEffect } from "react";
import axios from "axios";

const RouteDetails = (props) => {
  let [routeDetail, setRouteDetail] = useState({});
  useEffect(() => {
    async function routeLookUp() {
      let res = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${props.origin.lat},${props.origin.lng}&destination=${props.destination.lat},${props.destination.lng}&key=${process.envREACT_APP_GOOGLE_KEY}`
      );
      setRouteDetail(res.data.routes[0].legs[0]);
    }
    routeLookUp();
    props.setRouteInfo(routeDetail);
  }, [props]);
  return (
    <div>
      <h3>Route Detail</h3>
      <p>Distance : {routeDetail.distance?.text}</p>
      <p>Duration : {routeDetail.duration?.text}</p>
      {/* <p>Summary : {routeDetail?.summary}</p> */}
    </div>
  );
};

export default RouteDetails;
