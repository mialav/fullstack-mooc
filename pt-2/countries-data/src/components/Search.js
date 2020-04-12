import React from "react";

const Search = props => {
  return (
    <div>
      <p>Find countries: </p>
      <input value={props.search} onChange={props.handleSearch} />
    </div>
  );
};

export default Search;
