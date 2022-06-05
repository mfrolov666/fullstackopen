import React from 'react'

const PersonForm = ({handleNoteChange,  addNote}) => {


  return (
    <div>
      <form onSubmit={addNote}>
        <div>
          Note: <input 
            onChange={handleNoteChange}  />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}



export default PersonForm