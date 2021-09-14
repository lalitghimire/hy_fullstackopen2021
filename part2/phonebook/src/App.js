import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  // variables with initial states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredNames] = useState("");

  //fetching data from a json server(db.json)
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  // function to add a person to the persons(eventhandler)
  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    if (persons.filter((person) => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(personObject));
    //reset the value of states
    setNewName("");
    setNewNumber("");
  };

  // function which occur when form input changes
  // set new name(eventhandler function)
  const handlePersonAdd = (event) => {
    setNewName(event.target.value);
  };
  // set new name(eventhandler function)
  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value);
  };
  // set filterednames(eventhandler function)
  const handleFilteredName = (event) => {
    setFilteredNames(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputName={filteredName} onChange={handleFilteredName} />

      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNewPerson={handlePersonAdd}
        newNumber={newNumber}
        handleNewNumber={handleNumberAdd}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filteredName={filteredName} />
    </div>
  );
};

export default App;
