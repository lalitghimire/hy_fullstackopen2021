import React, { useState } from "react";

//button component with click event
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

// Statistics component
const Statistics = ({ good, bad, neutral, total }) => {
  // To display statistics only if feedback given
  if (!total) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average: {(good - bad) / total}</p>
      <p>positive: {(good / total) * 100} %</p>
    </div>
  );
};

//main app component
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  // functions which increase value of good, bad, neutral and total
  const clickGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const clickBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };
  const clickNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };

  return (
    <>
      <h1> give feedback</h1>

      <Button handleClick={clickGood} text="good" />
      <Button handleClick={clickNeutral} text="neutral" />
      <Button handleClick={clickBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </>
  );
};

export default App;
