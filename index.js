const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

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

  if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date()
  }) 

  person.save().then(savedPerson => {
    console.log(`added ${body.name} number ${body.number} to phonebook`)
    res.json(savedPerson.toJSON())
  })
})


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person.toJSON())     
    } else {
      res.status(404).end()
    }

  })
  .catch(error => {
    console.log(error)
    res.status(400).send({ error: 'malformatted id' })
  })
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
  .then(result => res.status(204).end()) 
})

app.get('/info', (req, res) => {
  const people = Person.find({}).length
  res.send(`
    <div>
    phonebook has info for ${people} people <br><br>
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