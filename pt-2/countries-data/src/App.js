import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = event => {
    // console.log(event.target.value);
    setSearch(event.target.value);
  };

  const filteredCountries =
    search === ""
      ? countries
      : countries.filter(country =>
          country.name.toLowerCase().includes(search.toLowerCase())
        );

  // console.log(filteredCountries);

  const handleClick = event => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Countries data</h1>
      <Search value={search} handleSearch={handleSearch} />
      <Countries countries={filteredCountries} handleClick={handleClick} />
    </div>
  );
}

export default App;
