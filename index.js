// Defining and Importing the required module
const express = require('express')
const app = express()
const cors = require('cors')

const Person = require('./models/persons')

app.use(express.json())
app.use(cors())

// Route to home
// When all data is fetching
app.get('/', (req, res) => {
  Person.find()
    .then(person => res.json(person))
    .catch(err => res.status(400).json('Error: ' + err))
})

/*

app.get('/:id', (req, res) =>{
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  res.json(person)
})

*/

// Deleting the contact3
app.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(res => {
      res.status(204).end()
    })
    .catch(err => next(err))
})


app.post('/', (req, res) => {
  console.log(req.body)
  const personObject = new Person(req.body)

  personObject.save()
    .then((res) => console.log('A contact is added'))
    .catch(err => res.status(400).json('Error: ' + err))
})

const date = new Date() 

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people<br>
    ${date}
  `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
