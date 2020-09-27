import React from "react";

const Covid19 = (props) => {
  function createCard() {
    if (JSON.stringify(props.covid19) === "{}") {
      return <div>Data not Available</div>;
    } else {
      return (
        <>
          <h5>{props.covid19.state} State</h5>
          <article>
            <p>Total Cases: {props.covid19.positive}</p>
            <p>Recoved: {props.covid19.recovered}</p>
            <p>Daily Increase: {props.covid19.positiveIncrease}</p>
            <p>Hospitalized Currently: {props.covid19.hospitalizedCurrently}</p>
            <p>In ICU Currently: {props.covid19.inIcuCurrently}</p>
            <p>Last Update On: {props.covid19.lastUpdateEt}pm</p>
          </article>
        </>
      );
    }
  }
  return (
    <div>
      <h3>Lastest Covid 19 Data</h3>
      <div>{createCard()}</div>
    </div>
  );
};

export default Covid19;
