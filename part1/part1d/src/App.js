import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({header}) => <h1>{header}</h1>

const Statistics = (props) => {
  const all = () => props.good+props.neutral+props.bad
  if (all() === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  const average = () => (props.good*1+props.neutral*0+props.bad*(-1))/all()

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td><StatisticLine value={props.good} /></td>
          </tr>
          <tr>
            <td>neutral</td>
            <td><StatisticLine value={props.neutral} /></td>
          </tr>        
          <tr>
            <td>bad</td>
            <td><StatisticLine value={props.bad} /></td>
          </tr>
          <tr>
            <td>all</td>
            <td><StatisticLine value={all()} /></td>
          </tr>
          <tr>
            <td>average</td>
            <td><StatisticLine value={average()} /></td>
          </tr>
          <tr>
            <td>positive</td>
            <td><StatisticLine value={props.good*100/all() + " %"} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({value}) => <div>{value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header = 'give feedback'/>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header header = 'statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
