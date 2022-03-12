import React from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [query, setQuery] = useState("")

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if ((persons.find((x) => x.name == newName)) == undefined)
      {
        return setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length +1 }))
      } 
      else {
        alert(`${newName} is already added to phonebook`)
        return setPersons(persons)
      }
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleNoteChange={handleNoteChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} addNote={addNote} />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} />
    </div>
  )
}

export default App