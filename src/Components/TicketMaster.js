import React from "react";

const TicketMaster = (props) => {
  function createCards() {
    if (JSON.stringify(props.events) === "{}") {
      return <div>Events not Available</div>;
    } else {
      return props.events.map((eachEvent) => {
        return (
          <div>
            <img src={eachEvent.images[0].url} alt="event pics" />
            <h5>{eachEvent.name}</h5>
            <article>
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
            </article>
          </div>
        );
      });
    }
  }

  return <div>{createCards()}</div>;
};

export default TicketMaster;
