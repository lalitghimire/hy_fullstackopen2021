import React from "react";

//Header component
const Header = (props) => {
  return <h1> {props.course} </h1>;
};

// Part component
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

//Content component
const Content = (props) => {
  //console.log(props);
  //console.log(props);
  //console.log(props.parts);
  //const temp = props.parts.map((x) => x.name);
  //console.log(temp);
  return (
    <div>
      {props.parts.map((x) => (
        <Part key={x.id} part={x.name} exercise={x.exercises} />
      ))}
    </div>
  );
};

//Course component
const Course = (props) => {
  console.log(props);
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  );
};

//main app component
const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10, id: 1 },

      { name: "Using props to pass data", exercises: 7, id: 2 },

      { name: "State of a component", exercises: 14, id: 3 },
    ],
  };
  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
