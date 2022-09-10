import React from 'react'
import services from '../services/methods'

const Persons = ({persons, query, delNote}) => {


const all = persons.filter(post => {
      if (query === ''){
        return post
      } else if (post.name.toLowerCase().includes(query.toLowerCase())) {
        return post
      }}).map(x =>
        <Note key={x.id} persName={x.name} persNumber={x.number} deleteNote={() => delNote(x.id)} />
    
)

  return (
    <div>{all}</div>
  );
}




const Note = ({persName, persNumber, deleteNote}) => {
  return (
    <div>
      <p className='note'>
        {persName} {persNumber} <button onClick={deleteNote} >delete</button>
      </p>
    </div>
  );
}

export default Persons