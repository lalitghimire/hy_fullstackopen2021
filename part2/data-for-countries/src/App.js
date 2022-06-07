import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchName, setSearchName] = useState('');

    // get countries from restcountries.eu
    useEffect(() => {
        //console.log("effect");
        axios.get('https://restcountries.com/v2/all').then((response) => {
            //console.log("promise fulfilled");
            //console.log(response.data);
            setCountries(response.data);
        });
    }, []);

    // event handler for searchbox
    const handleSearch = (event) => {
        console.log(event.target.value);
        setSearchName(event.target.value);
    };

    // filter the countries based on search characters
    const countriesList = countries.filter((country) =>
        country.name.toLowerCase().includes(searchName.toLowerCase())
    );

    return (
        <div>
            find countries <input value={searchName} onChange={handleSearch} />
            <br />
            {
                <Countries
                    countriesList={countriesList}
                    searchName={searchName}
                    setSearchName={setSearchName}
                />
            }
        </div>
    );
};

export default App;
