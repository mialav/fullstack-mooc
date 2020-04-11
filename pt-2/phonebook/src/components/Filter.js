import React from "react";

const Filter = props => {
  return (
    <div>
      <p>Filter names: </p>
      <input value={props.filterInput} onChange={props.handleFilter} />
    </div>
  );
};

export default Filter;
