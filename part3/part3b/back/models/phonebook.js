const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })



const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'name is required'],
    unique: true
  },
  number: {
    type: String,
    required: [true, 'phone number is required'],
    validate: {
      validator: function(x) {
        return /(\d{3}-\d{5})|(\d{2}-\d{6})|(\d{8})/.test(x)
      },
      message: 'Number is not valid'
    } }
})

phoneBookSchema.plugin(uniqueValidator)

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', phoneBookSchema)