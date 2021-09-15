import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  console.log(countries);
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");

      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      {countries.map((country) => (
        <p key={country.name}> {country.name}</p>
      ))}
    </div>
  );
};

export default App;
