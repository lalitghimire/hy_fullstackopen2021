import React, { useState } from "react";

const App = () => {
  // variables with initial states
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("type name");

  // function to add a person to the persons(eventhandler)
  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const personObject = {
      name: newName,
    };
    // do not mutate state
    // rather copy and update the variable
    // concat creates new copy of the array with new item added to end
    setPersons(persons.concat(personObject));
    //reset the value of newName state
    setNewName("");
  };

  // function which occur when form input changes
  // set new name(eventhandler function)
  const handlePersonadd = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonadd} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((x) => (
        <p key={x.name}>{x.name}</p>
      ))}
    </div>
  );
};

export default App;
