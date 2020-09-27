import React from "react";

const Yelp = (props) => {
  function Rating(point) {
    let result = "";
    for (let i = 0; i < 5; i++) {
      if (i < Math.round(Number(point.children))) {
        result += "★";
      } else {
        result += "☆";
      }
    }
    return result;
  }
  function createCards() {
    if (JSON.stringify(props.yelp) === "{}") {
      return <div>Restaurants Not Available</div>;
    } else {
      return props.yelp.map((eachRestaurant) => {
        return (
          <div>
            <img src={eachRestaurant.image_url} alt="restaurant.img"></img>
            <h5>
              {eachRestaurant.name}
              <Rating>{eachRestaurant.rating}</Rating>
            </h5>
            <article>
              <p>
                {eachRestaurant.categories.map((catg) => {
                  return <span>{catg.title}</span>;
                })}
              </p>
              <p>
                {eachRestaurant.location.display_address[0]},
                {eachRestaurant.location.display_address[1]}
              </p>
              <p>{eachRestaurant.display_phone}</p>
              <a href={eachRestaurant.url}>Reservation</a>
            </article>
          </div>
        );
      });
    }
  }

  return <>{createCards()}</>;
};
export default Yelp;
