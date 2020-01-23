const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

let persons = [
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 1
  }
]

const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


const url = `mongodb+srv://Punttikarhu:${password}@cluster0-diflf.mongodb.net/test?retryWrites=true&mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

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

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: Math.random()*10000
  }

  persons = persons.concat(person)

  res.json(person)
})


app.get('/api/persons', (req, res) => {
  Person.find({}).then(data => {
    response.json(data)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})