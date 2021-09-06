import React from "react";

//Header component
const Header = ({ courseName }) => {
  return <h2> {courseName} </h2>;
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
  //console.log(parts);
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
  return <strong>total of {total} exercises</strong>;
};

//Course component
// main component where all other compoenents reside
const Course = ({ course, parts }) => {
  // console.log(course);
  return (
    <div>
      <Header courseName={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
