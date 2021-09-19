import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

// weather info component
const ShowWeather = ({ capital }) => {
  console.log("here capital is ", capital);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    //console.log("effect");
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`
      )
      .then((response) => {
        //console.log("promise fulfilled");
        console.log("this is weather", response.data);
        setWeather(response.data);
      });
  }, []);

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature: {weather.current.temp_c} Celcius</p>
      <img src={weather.current.condition.icon} alt="image not available" />
      <p>
        wind: {weather.current.wind_kph} kmph direction{" "}
        {weather.current.wind_dir}
      </p>
    </div>
  );
};

// country details component
const CountryDetail = ({ country }) => {
  const name = country.name;
  const capital = country.capital;
  const population = country.population;
  return (
    <div>
      <h2>{name}</h2>
      <p>capital {capital} </p>
      <p>population {population} </p>
      <h3> Spoken languages </h3>
      <ul>
        {country.languages.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}{" "}
      </ul>
      <img src={country.flag} alt="flag" width="100" height="100" />
      <ShowWeather capital={capital} />
    </div>
  );
};

// Countries component
const Countries = ({ countriesList, searchName, setSearchName }) => {
  const showDetail = (country) => {
    setSearchName(country.name);
  };
  console.log("this is test", searchName);
  if (searchName.length === 0) {
    return <p>Type to search countries</p>;
  } else if (countriesList.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countriesList.length > 1) {
    return countriesList.map((country) => (
      <p key={country.name}>
        {country.name}{" "}
        <button onClick={() => showDetail(country)}> show</button>
      </p>
    ));
  } else if (countriesList.length === 1) {
    //console.log(countriesList[0]);
    return <CountryDetail country={countriesList[0]} />;
  } else return <p>try again</p>;
};

export default Countries;
