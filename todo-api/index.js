const express = require('express')
const knex = require('./db')
const app = express()
app.use(express.json())

app.get('/api', (req, res) => {
  res.send('Welcome to Todo-API')
})

app.get('/api/todo', async (req, res) =>{
  let results = await knex('todo')
  res.json(results)
})

app.post('/api/todo', async (req, res) =>{
  let results = await knex('todo')
                      .insert({text: req.body.text})
  res.json(results)
})

app.put('/api/todo/:id', async (req, res) =>{
  let results = await knex('todo')
                      .update({done: req.body.done})
                      .where('id', req.params.id)
  res.json(results)
})

app.delete('/api/todo/:id', async (req, res) =>{
  let results = await knex('todo')
                      .where('id', req.params.id)
                      .del()
  res.json(results)
})

app.listen(3000, () => console.log("Listening on port 3000"))
