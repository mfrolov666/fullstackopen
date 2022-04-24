import React from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import Weather from './components/Weather'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [country, setCountry] = useState([]) 
  const [query, setQuery] = useState("")

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountry(response.data)
      })
  }
  useEffect(hook, [])

  var max = ''
  
  const capital = country.filter(post => {
    if (post.name.common.toLowerCase().includes(query.toLowerCase()) ) {
      return post
    }
  }).map((x) => x.capital)
  
  if (capital.length === 1) {
    max = capital[0][0]
  }

  const handleFilterChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <Country country={country} query={query} setQuery={setQuery}  />
      {max ? <Weather capital = {max}/>: null}
    </div>
  )
}

export default App