import React, {useState} from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Header = ({header}) => <h1>{header}</h1>

const Vote = ({value}) => <div>has {value} votes</div>

const Most = ({arr, anecdotes}) => {
  const max = Math.max(...arr)
  const indexOfMaxValue = arr.indexOf(max)
  return (
    <div>
      {anecdotes[indexOfMaxValue]}<br />
      <Vote value = {max} />
    </div>
  )
}

const Current = ({value, anecdote}) => {
  return (
    <div>
      {anecdote}<br />
      <Vote value = {value} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const randomRange = (num) => {
    const min = Math.ceil(0);
    const max = Math.floor(num);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const points = Array(anecdotes.length).fill(0)
  const copy = [...points]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(copy)
  const [voteVision, setVoteVision] = useState(0)

  const handleClick = () => {
    setSelected(randomRange(anecdotes.length-1))
    setVoteVision(vote[selected])
  }

  const handleVoteClick = () => {
    vote[selected] += 1
    setVote(vote)
    setVoteVision(vote[selected])
  }
  
  return (
    <div>
      <Header header = 'Anecdote of the day'/>
      <Current value={vote[selected]} anecdote={anecdotes[selected]} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleClick} text='next anecdote' />
      <Header header = 'Anecdote with most votes'/>
      <Most arr ={vote} anecdotes={anecdotes} />
    </div>
  )
}

export default App
