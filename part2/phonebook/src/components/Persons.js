import React from "react";

const Persons = ({ persons, filteredName }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filteredName.toLowerCase())
    )
    .map((filteredPerson) => (
      <p key={filteredPerson.name}>
        {filteredPerson.name} {filteredPerson.number}
      </p>
    ));
};

export default Persons;
