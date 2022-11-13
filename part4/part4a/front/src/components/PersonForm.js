import React from 'react'

const PersonForm = ({handleNameChange, handleNumberChange, newName, newNumber, addNote}) => {


  return (
    <div>
      <form onSubmit={addNote}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}  />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}



export default PersonForm