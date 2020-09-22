import React, { useEffect, useState } from "react";
import axios from "axios";

function ProgrammingQuote(props) {
  let [quote, setQuote] = useState({});

  useEffect(() => {
    async function getQuote() {
      let res = await axios.get(
        "https://programming-quotes-api.herokuapp.com/quotes/random/lang/en"
      );
      setQuote(res.data);
    }
    getQuote();
  }, []);

  return (
    <>
      <p>{quote.en}</p>
      <p>By : {quote.author}</p>
    </>
  );
}

export default ProgrammingQuote;
