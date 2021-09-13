import React from "react";

const PersonForm = ({
  onSubmit,
  newName,
  handleNewPerson,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewPerson} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
