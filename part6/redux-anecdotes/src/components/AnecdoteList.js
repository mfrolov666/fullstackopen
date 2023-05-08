import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationVote, notificationRemove } from '../reducers/notificationReducer'


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
          <button onClick={() => {dispatch(vote(anecdote.id)); dispatch(notificationVote(anecdote.content)); setTimeout(() => {dispatch(notificationRemove())},5000)}}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList