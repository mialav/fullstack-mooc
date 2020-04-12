import React from "react";
import CountryDetail from "./CountryDetail";
import CountryList from "./CountryList";

const Countries = props => {
  let countries = props.countries;
  let handleClick = props.handleClick;
  let show;

  if (countries.length > 10) {
    show = <p>Too many matches, specify search</p>;
  } else if (countries.length === 1) {
    let country = countries[0];
    show = <CountryDetail country={country} />;
  } else if (countries.length <= 10) {
    show = <CountryList countries={countries} handleClick={handleClick} />;
  }

  return <div>{show}</div>;
};

export default Countries;
