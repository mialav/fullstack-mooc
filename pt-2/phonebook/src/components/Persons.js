import React from "react";
import Person from "./Person";

const Persons = ({ persons }) => {
  const people = persons.map(person => (
    <Person key={person.name} person={person} />
  ));

  return <div>{people}</div>;
};

export default Persons;
