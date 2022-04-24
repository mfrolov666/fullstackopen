import React from 'react'

const Persons = ({persons, query}) => {
const all = persons.filter(post => {
      if (query === ''){
        return post
      } else if (post.name.toLowerCase().includes(query.toLowerCase())) {
        return post
      }}).map(x =>
        <Note key={x.id} persName={x.name} persNumber={x.number}  />
)
  return (
    <div>{all}</div>
  );
}

const Note = ({persName, persNumber}) => {
  return (
    <div>
      <p>
        {persName} {persNumber}
      </p>
    </div>
  );
}

export default Persons