import React from 'react'

const Filter = ({handleFilterChange}) => {
  return (
    <div>
      <form>
        <div>
          filter shown with: <input 
            placeholder="enter search string"
            onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  );
}

export default Filter
