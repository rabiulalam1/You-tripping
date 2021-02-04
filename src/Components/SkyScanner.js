import React from 'react';
import './SkyScanner.css';

const SkyScanner = (props) => {
  function createTable() {
    if (
      props.flightDetail.Quotes == 0 ||
      props.flightDetail.Quotes === undefined
    ) {
      return (
        <tr>
          <td>Unavailabe</td>
          <td>Unavailabe</td>
          <td>Unavailabe</td>
          <td>Unavailabe</td>
        </tr>
      );
    } else {
      return props.flightDetail.Quotes.slice(0, 10).map((eachFlight) => {
        return (
          <tr>
            {props.flightDetail.Carriers.map((eachCarrier) => {
              if (
                eachFlight.OutboundLeg.CarrierIds[0] === eachCarrier.CarrierId
              ) {
                return <td>{eachCarrier.Name}</td>;
              }
            })}
            <td>{eachFlight.OutboundLeg.DepartureDate.slice(0, 10)}</td>
            <td>{eachFlight.Direct ? 'Yes' : 'No'}</td>
            <td>${eachFlight.MinPrice}</td>
          </tr>
        );
      });
    }
  }

  return (
    <div className="tableContainer">
      <div className="skyBody">
        <div className="skyScannerLogo">
          <img src="./images/skyscanner.png" alt="" />
        </div>

        <p>
          <strong>
            Flight Prices based on{' '}
            {props.flightDetail?.Places?.[1]?.IataCode || 'MCO'},
            {props.Places?.[1]?.CityName || 'Orlando'} to{' '}
            {props.flightDetail?.Places?.[0]?.IataCode || 'JFK'},
            {props.flightDetail?.Places?.[0]?.CityName || 'New York'}
          </strong>
        </p>
      </div>

      <div>
        <table className="tableHeader">
          <thead>
            <tr>
              <th>Carrier</th>
              <th>Departure Date</th>
              <th>Direct Flight</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>{createTable()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SkyScanner;
