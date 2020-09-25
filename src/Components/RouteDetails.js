import React from "react";

const RouteDetails = (props) => {
  return (
    <div>
      <h3>Route Detail</h3>
      <p>Distance : {props.dir.routes?.[0].legs[0].distance.text}</p>
      {/* <p>Duration : {props.dir?.duration?.text}</p> */}
      {/* <p>Summary : {routeDetail?.summary}</p> */}
    </div>
  );
};

export default RouteDetails;
