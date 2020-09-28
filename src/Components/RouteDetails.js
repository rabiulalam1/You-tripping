import React from "react";
import "./RouteDetails.css";

const RouteDetails = (props) => {
  console.log("Route Detail: ", props);
  return (
    <div className="routeContainer">
      <h3>Route Detail:</h3>
      <p>
        Distance : {props.dir.routes?.[0].legs[0].distance.text}, Duration :{" "}
        {props.dir.routes?.[0].legs[0].duration.text}, Summary:{" "}
        {props.dir.routes?.[0].summary}
      </p>
    </div>
  );
};

export default RouteDetails;
