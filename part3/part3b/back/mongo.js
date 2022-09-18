const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]


const url = `mongodb+srv://mfrolov666:${password}@cluster0.vj1titx.mongodb.net/phoneBook?retryWrites=true&w=majority`

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phoneBookSchema)

if (name && number) {
  mongoose
  .connect(url)
  .then((result) => {
    const note = new Phonebook({
      name: name,
      number: number,
    })
    console.log('added ' + note.name + ' number ' + note.number + ' to phonebook')
    return note.save()
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
}

if (!name || !number) {
  mongoose
    .connect(url)
    .then(() => {
      Phonebook.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(x => {
          console.log(x.name + ' ' + x.number)
        })
        mongoose.connection.close()
      })
    })
  }
