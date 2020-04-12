import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const person = { name: newName, number: newNumber };
    const names = persons.map(x => x.name.toLowerCase());

    names.indexOf(person.name) > -1
      ? window.alert(`${person.name} is already added to phonebook`)
      : setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };

  const handleNewName = event => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewNumber = event => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilter = event => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const personsToShow =
    filterInput === ""
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(filterInput.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterInput} handleFilter={handleFilter} />

      <h3>Add new person</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
