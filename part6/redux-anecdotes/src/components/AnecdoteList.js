import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({filter, anecdotes}) => {
 
    return filter === 'ALL'
      ? anecdotes
      : anecdotes.filter(x => x.content.toLowerCase().includes(filter.toLowerCase()))
  })
  
  const mySort = (field) => {
    return (a, b) => b[field] > a[field] ? 1 : -1
  }

  return(
    <div>
    {[...anecdotes]
      .sort(mySort('votes'))
      .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {dispatch(vote(anecdote.id)); dispatch(setNotification(`you voted '${anecdote.content}'`, 10))}}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList