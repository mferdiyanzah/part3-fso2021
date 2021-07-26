// Defining and Importing the required module
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// Connectin to MongoDB
const url = process.env.ATLAS_URL
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
  .then(res => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB: ', err.message)
  })

// Making the model schema for the database
const personSchema = new mongoose.Schema({
  name:String,
  number: Number,
})

module.exports = mongoose.model('Person', personSchema)