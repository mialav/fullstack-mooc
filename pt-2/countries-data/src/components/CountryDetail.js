import React, { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then(response => {
        setWeather(response.data.current);
      });
  }, []);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="100" alt={country.name} />
      <h3>Weather in {country.capital}</h3>
      <p>
        <b>Temperature</b>: {weather.temperature}
      </p>
      <img
        src={weather.weather_icons}
        width="50"
        alt={weather.weather_descriptions}
      />
      <p>
        <b>Wind: </b> speed {weather.wind_speed} mph direction{" "}
        {weather.wind_dir}
      </p>
    </div>
  );
};

export default CountryDetail;
