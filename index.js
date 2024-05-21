// config inicial
const express = require('express')
const app = express()

// depois do db
const mongoose = require('mongoose')

const Person = require('./models/Person')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// Rotas
app.post('/person', async (req, res) => {
  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved,
  }
  // O C do CRUD
  try {
    await Person.create(person)

    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})


// O R do CRUD 
app.get('/person', async (req, res) => {
  try {
    const people = await Person.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})


// O R do CRUD 
app.get('/person/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

// O U do CRUD 
app.patch('/person/:id', async (req, res) => {
  const id = req.params.id

  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved,
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

// O D do CRUD 
app.delete('/person/:id', async (req, res) => {
  const id = req.params.id

  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: 'Usuário não encontrado!' })
    return
  }

  try {
    await Person.deleteOne({ _id: id })

    res.status(200).json({ message: 'Usuário removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

// Conectando ao banco
let senha = "123456teste"
mongoose.connect(`mongodb+srv://rafadev:${senha}@cluster0.vtsrted.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    console.log("Conectamos ao mongoDB")
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
})
