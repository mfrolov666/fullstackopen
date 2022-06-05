import React from 'react'

const Persons = ({notes, query}) => {
const all = notes.filter(post => {
      if (query === ''){
        return post
      } else if (post.content.toLowerCase().includes(query.toLowerCase())) {
        return post
      }}).map(x =>
        <Note key={x.id} cont={x.content}  />
)
  return (
    <div>{all}</div>
  );
}

const Note = ({cont}) => {
  return (
    <div>
      <p>
        {cont}
      </p>
    </div>
  );
}

export default Persons