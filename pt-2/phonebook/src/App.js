import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("notification");

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const person = { name: newName, number: newNumber };
    const names = persons.map(x => x.name.toLowerCase());

    names.indexOf(person.name.toLowerCase()) > -1
      ? updatePerson(newName, newNumber)
      : personService.create(person).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setNotification(`${returnedPerson.name} was added`);
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
  };

  const updatePerson = (name, newNumber) => {
    const person = persons.find(
      p => p.name.toLowerCase() === name.toLowerCase()
    );
    const id = person.id;
    const updatedPerson = { ...person, number: newNumber };

    if (window.confirm(`${name} is already in phonebook, update number?`)) {
      personService
        .update(id, updatedPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(person => (person.id !== id ? person : returnedPerson))
          );
          setNewName("");
          setNewNumber("");
          setNotification(`${returnedPerson.name} was updated`);
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        })
        .catch(error => {
          setNotificationType("error");
          setNotification(`${person.name} was already deleted`);
          setTimeout(() => {
            setNotification(null);
            setNotificationType("notification");
          }, 3000);
          setPersons(
            persons.filter(p => p.name.toLowerCase() !== name.toLowerCase())
          );
        });
    }
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

  const handleDelete = id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() =>
        personService.getAll().then(initialPersons => {
          setPersons(initialPersons);
        })
      );
    }
  };

  const personsToShow =
    filterInput === ""
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(filterInput.toLowerCase())
        );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} type={notificationType} />
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
