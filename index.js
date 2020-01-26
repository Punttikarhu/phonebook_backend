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

app.post('/api/persons', (req, res, next) => {

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
  }).catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
    date: new Date()
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
  .then(updatedPerson => res.json(updatedPerson.toJSON()))
  .catch(error => next(error))
})


app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person.toJSON())     
    } else {
      res.status(404).end()
    }

  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
  .then(result => res.status(204).end())
  .catch(error => next(error)) 
})

app.get('/info', (req, res) => {
  const people = Person.find({})
  res.send(`
    <div>
    phonebook has info for ${Object.keys(people).length} people <br><br>
    ${new Date()}
    </div>
    `)
})

app.get('/api/persons:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => res.json(person))
  .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})