const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))
app.use(express.json())
app.use(cors())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('Hello Worlds')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) =>{
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.send(req.params.id+' is deleted')
})

app.post('/api/persons/', (req, res) => {
  const id = Math.floor(Math.random() * 1000)

  const personObject = req.body

  let message = ''

  if((personObject.name === undefined) || (personObject.number === undefined)){
    message = 'The number or name is missing'
    res.json({
      error:message
    })
  } else{
    const checkName = persons.find((person) => person.name === personObject.name)

    if(checkName){
      message = 'The name already exists in the phonebook'
      res.json({
        error:message
      })
    } else{
      personObject.id = id
  
      persons = persons.concat(personObject)
    
      res.json(personObject)
    }
  }
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
