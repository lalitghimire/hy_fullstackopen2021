import React from "react";

const Persons = ({ persons, filteredName, deletePerson }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filteredName.toLowerCase())
    )
    .map((filteredPerson) => (
      <p key={filteredPerson.name}>
        {filteredPerson.name} {filteredPerson.number}{" "}
        {
          <button onClick={() => deletePerson(filteredPerson.id)}>
            {" "}
            Delete{" "}
          </button>
        }
      </p>
    ));
};

export default Persons;
