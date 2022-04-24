import React from 'react'

const Country = ({ country, query, setQuery }) => {

  const capital = country.filter(post => {
    if (post.name.common.toLowerCase().includes(query.toLowerCase())) {
      return post
    }
  }).map(x =>
    <Values key={x.capital} value={x.capital} />
  )

  const name = country.filter(post => {
    if (post.name.common.toLowerCase().includes(query.toLowerCase())) {
      return post
    }
  }).map(x =>
    <Countries key={x.name.common} value={x.name.common} />
  )

  const area = country.filter(post => {
    if (post.name.common.toLowerCase().includes(query.toLowerCase())) {
      return post
    }
  }).map(x =>
    <Values key={x.area} value={x.area} />
  )

  const languages = country.filter(post => {
    if (post.name.common.toLowerCase().includes(query.toLowerCase())) {
      return post
    }
  }).map(x =>
    <Lang key={x.area} value={x.languages} />
  )

  const flag = country.filter(post => {
    if (post.name.common.toLowerCase().includes(query.toLowerCase())) {
      return post
    }
  }).map(x =>
    <Values key={x.flags.png} value={x.flags.png} />
  )

  const WholeInfo = ({ name, capital, area, languages, flag, weather1 }) => {
    return (
      <div>
        <h1>{name}</h1>
        <div>capital {capital}</div>
        <div>area {area}</div>
        <h3>languages</h3>
        <ul>
          {languages}
        </ul>
        <img src={flag[0].key} alt="" />
      </div>
    )
  }

  const handler = function(e){
    console.log(e.target.getAttribute("data-index")); 
    return setQuery(e.target.getAttribute("data-index"));
};

  const CountriesShow = ({value, index}) => {
    return (<div>{value}<button data-index={index} onClick={handler}>show</button></div>)
  }

  const nameShow = country.filter(post => {
    if (post.name.common.toLowerCase().includes(query.toLowerCase())) {
      return post
    }
  }).map(x =>
    <CountriesShow key={x.name.common} value={x.name.common} index={x.name.common} />
  )
  
  if (name.length > 1 && name.length <= 10) {
    return (
      <div>{nameShow}</div>

    )
  }
  else if (name.length === 1) {
    return (
      <WholeInfo name={name} capital={capital} area={area} languages={languages} flag={flag}  />
    )
  }

  return (
    <div>Too many matches, specify another filter</div>
  )

}

const Countries = ({ value }) => {
  return (<div>{value}</div>)
}


const Values = ({ value }) => {
  return value
}
const Lang = ({ value }) => {
  const arr1 = Object.values(value)
  return arr1.map((x) =>
    <li key={x}>{x}</li>
  );

}

export default Country
