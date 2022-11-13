const personsRouter = require('express').Router()
const Phonebook = require('../models/phonebook')

personsRouter.get('/info', (request, response) => {
  Phonebook.countDocuments({}).then(x => {
    response.send('<p>Phonebook has info for ' + x + ' people</p><p>' + new Date() + '</p>')
  })
})

personsRouter.get('/', (request, response) => {
  Phonebook.find({}).then(x => {
    response.json(x)
  })
})

personsRouter.get('/:id', (request, response, next) => {
  Phonebook.findById(request.params.id).then(x => {
    if(x){
      response.json(x)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  })

  person.save().then(x => {
    response.json(x)
  })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  Phonebook.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(x => {
      response.json(x)
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = personsRouter