require('dotenv').config({path: 'C:/Users/Janne/react_app/puhelinluettelo_backend/.env'})
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(String(url), { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

//Change returned json
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id
    delete returnedObject.__v
  }
})



app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('data', function(req, res) {
  return JSON.stringify(req.body);
})
app.use(morgan(':method :status - :response-time ms :data'))

app.post('/api/persons', (req, res) => {

  const body = req.body

  if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing',
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return res.status(409).json({ 
      error: 'name already exists',
    })    
  }

  if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing',
    })
  }

  const person = new Person({
    name: name,
    number: number,
    date: new Date()
  }) 

  person.save().then(savedPerson => {
    console.log(`added ${name} number ${number} to phonebook`)
    res.json(savedPerson.toJSON())
  })
})


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(persons => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.get('/info', (req, res) => {
  res.send(`
    <div>
    phonebook has info for ${persons.length} people <br><br>
    ${new Date()}
    </div>
    `)
})

app.get('/api/persons:id', (req, res) => {
  const id = Number(req.param.id)
  const person = persons.find(person => person.id === id)
  res.json(person)
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})