import React from "react";

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital} </p>
      <p>population {country.population} </p>
      <h3> languages </h3>
      <ul>
        {country.languages.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}{" "}
      </ul>
      <img src={country.flag} alt="flag" width="100" height="100" />
    </div>
  );
};

const Countries = ({ countriesList, searchName, setSearchName }) => {
  const showdetail = (country) => {
    setSearchName(country.name);
  };

  if (searchName.length === 0) {
    return <p>Type to search countries</p>;
  } else if (countriesList.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countriesList.length > 1) {
    return countriesList.map((country) => (
      <p key={country.name}>
        {country.name}{" "}
        <button onClick={() => showdetail(country)}> show</button>
      </p>
    ));
  } else if (countriesList.length === 1) {
    //console.log(countriesList[0]);
    return <CountryDetail country={countriesList[0]} />;
  } else return <p>try again</p>;
};

export default Countries;
