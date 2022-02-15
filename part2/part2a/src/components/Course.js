import React from 'react'

const Header = ({header}) => {
  return (
    <div>
      <h2>{header}</h2>
    </div>
  );
}
  
const Content = ({parts}) => {
  return (
    <div>
      {parts.map(x =>
        <Part key={x.id} a={x.name} b={x.exercises} />
      )}
    </div>
  );
}
  
const Total = ({parts}) => {
  const total = parts.reduce((sum,part) => sum + part.exercises, 0)
  return (
    <div>
      <h4>total of {total} exercises</h4>
    </div>
  )
}
  
const Part = ({a, b}) => {
  return (
    <div>
      <p>
        {a} {b}
      </p>
    </div>
  );
}
  
const Course = ({courses}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(x =>
        <CoursePart key={x.id} header={x.name} parts={x.parts} />
      )}
    </div>
  );
}
  
const CoursePart = ({header,parts}) => {
  return (
    <div>
      <Header header = {header} />
      <Content parts = {parts} />
      <Total parts = {parts} />
    </div>
  );
}

export default Course