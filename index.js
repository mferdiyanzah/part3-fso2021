// Defining and Importing the required module
const express = require('express')
const app = express()
const cors = require('cors')

const Person = require('./models/persons')

app.use(express.json())
app.use(cors())

// Route to home
// When all data is fetching
app.get('/', (req, res, next) => {
    Person.find()
        .then(person => {
            res.json(person)
        })
        .catch(err => next(err))
})

// Deleting the contact3
app.delete('/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
            console.log(req.params.id+ ' is deleted')
        })
        .catch(err => next(err))
})


app.post('/', (req, res, next) => {
    const personObject = new Person(req.body)

    personObject.save()
        .then(() => console.log('A contact is added'))
        .catch(err => next(err))
})

app.put('/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person)
        .then(() => console.log(person.name+ ' is updated'))
        .catch(err => next(err))
})

app.get('/:id', (req, res, next) => {
    console.log('get: '+req.params.id)
    Person.find({_id:req.params.id})
        .then(person => {
            res.json(person)
        })
        .catch(err => next(err))
})


// Error Handlers
const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknowrn endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if(error.name === 'CastError'){
        return res.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        return res.status(400).json({error: error.message})
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
