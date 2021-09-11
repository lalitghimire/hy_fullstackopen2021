import React, { useState } from "react";

const App = () => {
  // variables with initial states
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 400940000 },
    { name: "Bishop Arthur", number: 409000002 },
    { name: "Robert Wang", number: 409000003 },
    { name: "Emma Right", number: 409000004 },
    { name: "Ella Williams", number: 409000005 },
  ]);
  const [newName, setNewName] = useState("type name");
  const [newNumber, setNewNumber] = useState(111111111);
  const [filteredName, setFilteredNames] = useState("");

  // function to add a person to the persons(eventhandler)
  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    //using find method of array
    // if (persons.find((x) => x.name === newName)) {
    //   window.alert(`${newName} is already added to phonebook`);
    //   return;
    // }
    //using filter method. if found duplicate filtered array will have items (note to self: return will end function execution)
    if (persons.filter((person) => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };
    // do not mutate state
    // rather copy and update the variable
    // concat creates new copy of the array with new item added to end

    setPersons(persons.concat(personObject));
    //reset the value of newName state
    setNewName("");
    setNewNumber("");
  };

  // function which occur when form input changes
  // set new name(eventhandler function)
  const handlePersonadd = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberadd = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilteredName = (event) => {
    console.log(event.target.value);
    setFilteredNames(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with{" "}
        <input value={filteredName} onChange={handleFilteredName} />
        {console.log(filteredName)}
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonadd} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberadd} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filteredName.toLowerCase())
        )
        .map((filteredPerson) => (
          <p key={filteredPerson.name}>
            {filteredPerson.name} {filteredPerson.number}
          </p>
        ))}
    </div>
  );
};

export default App;
