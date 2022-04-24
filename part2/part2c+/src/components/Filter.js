import React from 'react'

const Filter = ({handleFilterChange}) => {
  return (
    <div>
      <form>
        <div>
          find countries <input 
            placeholder="enter search string"
            onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  );
}

export default Filter
