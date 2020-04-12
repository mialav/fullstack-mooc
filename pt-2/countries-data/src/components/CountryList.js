import React from "react";

const CountryList = props => {
  let countries = props.countries;
  let handleClick = props.handleClick;

  return countries.map(country => (
    <p key={country.alpha3Code}>
      {country.name}
      <button value={country.name} onClick={handleClick}>
        show
      </button>
    </p>
  ));
};

export default CountryList;
