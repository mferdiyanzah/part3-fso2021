const mongoose  = require("mongoose")
require('dotenv').config()

// Initializating url
const url = process.env.ATLAS_URL

// Connecting to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex:true
}).then(res => {
  console.log('Connected to MongoDB')
}).catch(err => {
  console.log('Error connecting to MongoDB: ', err.message)
})

// Make Model Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[2],
  number: process.argv[3],
})

if(person.name === undefined){
  Person.find({}).then(res => {
    res.forEach(person => {
      console.log(person)
      mongoose.connection.close()
    })
  })
} else{
  mongoose.connection.close()
  person.save().then(res => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

module.exports = Person
