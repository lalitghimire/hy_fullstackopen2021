import React, { useState } from "react";

//button component with click event
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  );
};

// Statistics component
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100 + " %";

  // To display statistics only if feedback given
  if (!total) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  );
};

//main app component
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // functions which increase value of good, bad, neutral and total
  const clickGood = () => {
    setGood(good + 1);
  };
  const clickBad = () => {
    setBad(bad + 1);
  };
  const clickNeutral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <>
      <h1> give feedback</h1>

      <Button handleClick={clickGood} text="good" />
      <Button handleClick={clickNeutral} text="neutral" />
      <Button handleClick={clickBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
