// Defining and Importing the required module
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')
require('dotenv').config()

// Connectin to MongoDB
const url = process.env.ATLAS_URL
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log('Error connecting to MongoDB: ', err.message)
    })

// Making the model schema for the database
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        minLength: 3,
        required: true,
    },
    number:{
        type: Number,
        minLength: 8,
        required: true,
    },
})

// Transform _id to id and delete _id and _v
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)