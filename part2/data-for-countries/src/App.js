import React, { useState } from "react";

const App = () => {
  const [countries, setCountries] = useState("Finland");

  return (
    <div>
      <p>{countries}</p>
    </div>
  );
};

export default App;
