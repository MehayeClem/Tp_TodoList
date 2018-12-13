const router = require('express').Router()
const Todos = require('./../models/todos')
const _ = require('lodash')

router.get('/', (req, res) => {
  Todos.getAll().then((todos) => res.json(todos)).catch((err) => {
    return res.status(404).send(err)
  })
})


module.exports = router