import React from "react";

const Filter = ({ inputName, onChange }) => {
  return (
    <div>
      filter shown with <input value={inputName} onChange={onChange} />
      {console.log(inputName)}
    </div>
  );
};

export default Filter;
