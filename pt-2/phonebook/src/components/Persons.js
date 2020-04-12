import React from "react";
import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
  const people = persons.map(person => (
    <Person key={person.name} person={person} handleDelete={handleDelete} />
  ));

  return <div>{people}</div>;
};

export default Persons;
