import React from 'react';
import './Covid19.css';

const Covid19 = (props) => {
  function createCard() {
    if (JSON.stringify(props.covid19) === '{}') {
      return <div>Data not Available</div>;
    } else {
      return (
        <div>
          <h5>{props.covid19.state} State</h5>
          <article>
            <p>
              Total Cases:{' '}
              {props.covid19.positive
                ? props.covid19.positive
                : 'No Data Available'}
            </p>
            <p>
              Recoved:{' '}
              {props.covid19.recovered
                ? props.covid19.recovered
                : 'No Data Available'}
            </p>
            <p>
              Daily Increase:{' '}
              {props.covid19.positiveIncrease
                ? props.covid19.positiveIncrease
                : 'No Data Available'}
            </p>
            <p>
              Hospitalized Currently:{' '}
              {props.covid19.hospitalizedCurrently
                ? props.covid19.hospitalizedCurrently
                : 'No Data Available'}
            </p>
            <p>
              In ICU Currently:{' '}
              {props.covid19.inIcuCurrently
                ? props.covid19.inIcuCurrently
                : 'No Data Available'}
            </p>
            <p>
              Last Update On:{' '}
              {props.covid19.lastUpdateEt
                ? props.covid19.lastUpdateEt
                : 'No Data Available'}
              pm
            </p>
          </article>
        </div>
      );
    }
  }
  return (
    <div className="covidBody">
      <div className="covidSection">
        <div className="covidCard">
          <div className="covidBox">
            <div className="covidImgBx">
              <img src="./images/covid.png" alt="" />
            </div>
            <div className="covidContentBx">{createCard()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Covid19;
