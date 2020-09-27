import React from "react";

const SkyScanner = (props) => {
  function createTable() {
    if (
      props.flightDetail.Quotes == 0 ||
      props.flightDetail.Quotes === undefined
    ) {
      console.log("No Flight Available");
      return (
        <tr>
          <td>Unavailabe</td>
          <td>Unavailabe</td>
          <td>Unavailabe</td>
          <td>Unavailabe</td>
        </tr>
      );
    } else {
      return props.flightDetail.Quotes.map((eachFlight) => {
        return (
          <tr>
            <td>{eachFlight.OutboundLeg.CarrierIds[0]}</td>
            <td>{eachFlight.OutboundLeg.DepartureDate}</td>
            <td>{eachFlight.InboundLeg.DepartureDate}</td>
            <td>{eachFlight.MinPrice}</td>
          </tr>
        );
      });
    }
  }

  return (
    <div>
      <h3>Flight Details:</h3>
      <p>
        Flight Prices based on
        {props.flightDetail?.Places?.[1]?.IataCode || "MCO"},
        {props.Places?.[1]?.CityName || "Orlando"} to
        {props.flightDetail?.Places?.[0]?.IataCode || "JFK"},
        {props.flightDetail?.Places?.[0]?.CityName || "New York"}
      </p>
      <table>
        <tr>
          <th>Carrier</th>
          <th>Departure Date</th>
          <th>Return Date</th>
          <th>Price</th>
        </tr>
        {createTable()}
      </table>
    </div>
  );
};

export default SkyScanner;