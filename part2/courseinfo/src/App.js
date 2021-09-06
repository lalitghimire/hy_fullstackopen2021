import React from "react";

//Header component
const Header = ({ courseName }) => {
  return <h1> {courseName} </h1>;
};

// Part component
const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

//Content component
const Content = ({ parts }) => {
  //console.log(props);
  //console.log(props.parts);
  //const temp = props.parts.map((x) => x.name);
  //console.log(temp);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
    </div>
  );
};

//Total component
const Total = ({ parts }) => {
  //console.log(props);
  // const total = props.parts.reduce((s,p)=> {return (s+a),0 })

  const total = parts.reduce((s, p) => s + p.exercises, 0);
  return <div>total of {total} exercises</div>;
};

//Course component
const Course = ({ course }) => {
  //console.log(course);
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
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
