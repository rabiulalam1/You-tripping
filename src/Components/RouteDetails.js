import React from "react";
import "./RouteDetails.css";

const RouteDetails = (props) => {
  //console.log("Route Detail: ", props);
  return (
    <div className="routeContainer">
      <img src="./images/google-logo.png" alt="" />

      <div className="routeInfo">
        <p>
          Distance : {props.dir.routes?.[0].legs[0].distance.text}, Duration :{" "}
          {props.dir.routes?.[0].legs[0].duration.text}, Summary:{" "}
          {props.dir.routes?.[0].summary}
        </p>
      </div>
    </div>
  );
};

export default RouteDetails;
