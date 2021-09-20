import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  // variables with initial states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredNames] = useState("");

  //fetching persons from a json server(db.json) using personService
  useEffect(() => {
    personService.getAll().then((initialList) => {
      setPersons(initialList);
    });
  }, []);

  // function to add a person to the persons
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.filter((person) => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    //create new person using personService
    personService.create(personObject).then((returnedObject) => {
      setPersons(persons.concat(returnedObject));
      setNewName("");
      setNewNumber("");
    });
  };

  //function to delete a person
  const deletePerson = (id) => {
    const deletePersonName = persons
      .filter((person) => person.id === id)
      .map((person) => person.name);
    // confirm with window.confirm
    const confirm = window.confirm(`Do you want to delete ${deletePersonName}`);

    // delete the item in database using personService.deleteOne
    if (confirm) {
      const updatedList = { ...persons };
      personService
        .deleteOne(id, updatedList)
        .then(setPersons(persons.filter((p) => p.id !== id)));
    }
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
      <Persons
        persons={persons}
        filteredName={filteredName}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
