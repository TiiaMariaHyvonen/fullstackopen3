const { response } = require('express')
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))

let persons = [
      {
        "name": "Arto Hellas",
        "number": "550-5343-423",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "534-1236-64",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]

app.get('/info', (req, res) => {
    const number = persons.length
    const time = new Date()
    res.send(`<p>Phonebook had info for ${number} people </p><p> ${time} </p>`)
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
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

  app.post('/api/persons', (request, res) => {
      const body = request.body
      const name = body.name

      if (!name) {
          return res.status(400).json({
              error: 'name missing'
          })
      }
      if (!body.number) {
          return res.status(400).json({
              error: 'number missing'
          })
      }
      if (persons.find(person => person.name === name)){
          return res.status(400).json({
              error: 'name must be unique'
          })
      }

      const person = {
          name: name,
          number: body.number,
          id: Math.floor(Math.random() * 4000)
      }
      console.log(person)

      persons = persons.concat(person)

      res.json(person)

  })


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })