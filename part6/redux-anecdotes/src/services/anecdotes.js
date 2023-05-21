import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${ baseUrl }/${id}`)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const votePlus1 = async (id, cont) => {
  const obj = {votes: cont.votes + 1}
  const request = axios.patch(`${ baseUrl }/${id}`, obj)
  console.log(request)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, votePlus1, getById }

