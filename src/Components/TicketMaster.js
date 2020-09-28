import React from "react";
import "./TicketMaster.css";

const TicketMaster = (props) => {
  function createCards() {
    if (JSON.stringify(props.events) === "{}") {
      return <div>Events not Available</div>;
    } else {
      return props.events.map((eachEvent) => {
        return (
          <div className="ticketCard">
            <div className="ticketImg">
              <img src={eachEvent.images[0].url} alt="event pics" />
            </div>
            <div className="ticketContent">
              <h3>{eachEvent.name}</h3>

              <p>
                {eachEvent.dates.start.localDate}@
                {eachEvent.dates.start.localTime}
              </p>
              <p>
                ${eachEvent.priceRanges?.[0].min} - $
                {eachEvent.priceRanges?.[0].max}
              </p>
              <p>{eachEvent._embedded.venues[0].name}</p>
              <a href={eachEvent.url}>Buy Ticket</a>
            </div>
          </div>
        );
      });
    }
  }

  return (
    <div className="ticketBody">
      <div>
        <img src="./images/ticketmaster.png" alt="" />
      </div>
      <div className="ticketContainer">{createCards()}</div>
    </div>
  );
};

export default TicketMaster;
