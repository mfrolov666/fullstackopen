import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationAdd, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()


  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notificationAdd(content))
  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button onClick={() => {setTimeout(() => {dispatch(notificationRemove())},5000)}} type="submit">add</button>
    </form>
    </div>
  )
}

export default AnecdoteForm