import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
  };

  const showCountriesList = (searchName, countries) => {
    const countriesList = countries.filter((country) =>
      country.name.toLowerCase().includes(searchName.toLowerCase())
    );
    console.log(countriesList);
    if (searchName) {
      if (countriesList.length > 10) {
        return <p>Too many matches, specify another filter</p>;
      } else if (countriesList.length > 1) {
        return countriesList.map((c) => <p key={c.name}>{c.name} </p>);
      } else if (countriesList.length === 1) {
        let country = countriesList[0];
        return (
          <div>
            <h2>{country.name}</h2>

            <p>capital {country.capital} </p>
            <p>population {country.population} </p>

            <h3> languages </h3>

            {country.languages.map((c) => (
              <p key={c.name}>{c.name}</p>
            ))}

            {console.log(countriesList[0].languages[0])}
            <img src={country.flag} alt="flag" width="100" height="100" />
          </div>
        );
      }
    }
  };

  return (
    <div>
      find countries <input value={searchName} onChange={handleSearch} />
      <br />
      <br />
      {showCountriesList(searchName, countries)}
    </div>
  );
};

export default App;
