import React from 'react'
import Filter from './components/Filter'
import Note from './components/Note'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import { useState, useEffect } from 'react'



const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState([])


  const [query, setQuery] = useState("")

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  useEffect(hook, [])
  
  

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }
  
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response)
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }



  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }


  return (
    <div>
      <h2>Search Note</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleNoteChange={handleNoteChange}  addNote={addNote} />
      <h2>Notes</h2>
      <Persons notes={notes} query={query} />
    </div>
  )
}

export default App