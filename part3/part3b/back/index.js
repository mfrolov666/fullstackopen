require('dotenv').config()
const express = require('express')
const morgan  = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.send('<h1>Hellfo World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(x => {
    response.json(x)
  })
})


app.get('/info', (request, response) => {
  Phonebook.countDocuments({}).then(x => {
    response.send('<p>Phonebook has info for ' + x + ' people</p><p>' + new Date() + '</p>')
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id).then(x => {
    if(x){
      response.json(x)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
 
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number are missing' 
    })
  }

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  })

  person.save().then(x => {
    response.json(x)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Phonebook.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(x => {
      response.json(x)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})