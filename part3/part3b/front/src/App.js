import React from 'react'
import services from './services/methods'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [style, setStyle] = useState(0)

  useEffect(() => {
    services
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])


  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const noteObject = {
      name: newName,
      number: newNumber,
    }

    if (((persons.find((x) => x.name === newName)) !== undefined)&&(persons.find((x) => x.number === newNumber) === undefined))
      {
        if(window.confirm((persons.find((x) => x.name === newName).name) + " is already added to phonebook, replace the old number with a new one?")){
        services
          .update(persons.find((x) => x.name === newName).id, noteObject)
          .then(returnedNote => {
            persons.find((x) => x.name === newName).number = returnedNote.number
            setStyle(0)
            setErrorMessage("Updated " + returnedNote.name)
            setPersons(persons)
            setNewName('')
            setNewNumber('')})
          .catch(error => {
            setStyle(1)
            setErrorMessage(
              `Infromation of '${newName}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
            
          })
          } else {return setPersons(persons)}

      } else if (((persons.find((x) => x.name === newName)) === undefined)) {
        
        services
          .create(noteObject)
          .then(returnedNote => {
            setPersons(persons.concat(returnedNote))
            setStyle(0)
            setErrorMessage("Added " + returnedNote.name)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
          })

      }
      else {
        alert(`${newName} is already added to phonebook`)
        return setPersons(persons)
      }
      
  }

  const deleteNote = (id) => {
    console.log(persons.find(x => x.id === id))
    if(window.confirm("Delete " + persons.find(x => x.id === id)["name"] + " ?")){
      services
        .deleteQuery(id)
        .catch(error => {
          setStyle(1)
          setErrorMessage(
            `Infromation of '${newName}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
          
        })
      const newpers = persons.filter(x => x.id !== id)
      return setPersons(newpers)
    } else {return setPersons(persons)}
  }



  const handleNameChange = (event) => {
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
      <Notification message={errorMessage} state = {style}/>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} addNote={addNote} />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} delNote={deleteNote} />
    </div>
  )
}

export default App