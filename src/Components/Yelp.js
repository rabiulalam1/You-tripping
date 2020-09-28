import React from "react";
import "./Yelp.css";

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
          <div className="yelpCard">
            <div className="yelpFace yelpFace1">
              <div className="yelpContent">
                <img src={eachRestaurant.image_url} alt="restaurant.img"></img>
                <h4>{eachRestaurant.name}</h4>
              </div>
            </div>
            <div className="yelpFace yelpFace2">
              <div className="yelpContent">
                <p>
                  <p>
                    <Rating>{eachRestaurant.rating}</Rating>
                  </p>
                  {eachRestaurant.categories.map((catg) => {
                    return <span>{catg.title} </span>;
                  })}
                </p>
                <p>
                  {eachRestaurant.location.display_address[0]},
                  {eachRestaurant.location.display_address[1]}
                </p>
                <p>{eachRestaurant.display_phone}</p>
                <a href={eachRestaurant.url}>Reservation</a>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  return (
    <div className="yelpBody">
      <div className="yelpLogo">
        <img src="./images/yelp.png" alt="" />
      </div>
      <div className="yelpContainer">{createCards()}</div>
    </div>
  );
};
export default Yelp;
