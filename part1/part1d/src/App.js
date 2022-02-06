import React from 'react';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  );
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part a = {props.course.parts[0]['name']} b={props.course.parts[0]['exercises']} />
      <Part a = {props.course.parts[1]['name']} b={props.course.parts[1]['exercises']} />
      <Part a = {props.course.parts[2]['name']} b={props.course.parts[0]['exercises']} />
    </div>
  );
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.course.parts[0]['exercises'] + props.course.parts[1]['exercises'] + props.course.parts[2]['exercises']}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.a} {props.b}
      </p>
    </div>
  );
}

export default App;
