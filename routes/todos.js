const router = require('express').Router()
const Todos = require('./../models/todos')

router.post('/', (req, res) => {
    let message = req.body.message
    let completion = req.body.completion
    
    if (!message || /^ *$/.test(message))
        res.end("Mauvaises valeurs")
    if (!completion || /^ *$/.test(completion) || (completion != "done" && completion != "not done"))
        res.end("Mauvaises valeurs")
    
    Todos.createTodo(message, completion)
    .then(() => { 
        res.format({
            html: () => { res.redirect('/todos') },
            'application/json': () => { res.json({status: 'success'}) }
        })
    })
    .catch(() => res.json({status: 'failed'}))
})

router.get('/add', (req, res) => {
    res.render('todos/edit', {
        id: "",
        title: "Ajouter une Todo",
        _method: "POST"
    });
})

router.get('/:todoId/edit', (req, res) => {
    let id = req.params.todoId
    if (!/^[0-9]+$/.test(id))
        res.end("Mauvais id")

    Todos.findTodo(id)
    .then((success) => 
        res.render('todos/edit', {
            id: req.params.todoId,
            title: "Modifier une Todo",
            _method: "PATCH",
            todo: success
        })
    )
    .catch(() => res.json({status: 'failed'}))

    
})

router.get('/:todoId', (req, res) => {
    let id = req.params.todoId
    if (!/^[0-9]+$/.test(id))
        res.end("Mauvais id")

    Todos.findTodo(id)
    .then((success) => 
        res.format({
            html: () => { 
                res.render('todos/show', {
                    todo: success
                }) 
            },
            'application/json': () => { res.json(success) }
        })
    )
    .catch(() => res.json({status: 'failed'}))
})

router.get('/', (req, res) => {
    let limit = req.query.limit
    let offset = req.query.offset
    let completion = req.query.completion
    
    Todos.getAll(limit, offset, completion)
    .then((success) => 
        res.format({
            html: () => { 
                res.render('todos/index', {
                    todos: success
                }) 
            },
            'application/json': () => { res.json(success) }
        })
    )
    .catch(() => res.json({status: 'failed'}))
})

router.delete('/:todoId', (req, res) => {
    let id = req.params.todoId
    if (!/^[0-9]+$/.test(id))
        res.end("Mauvais id")
    
    Todos.deleteTodo(id)
    .then(() => { 
        res.format({
            html: () => { res.redirect(303, '/todos') },
            'application/json': () => { res.json({status: 'success'})}
        })
    })
    .catch(() => res.json({status: 'failed'}))
})

router.patch('/:todoId', (req, res, next) => {
    let id = req.params.todoId
    if (!/^[0-9]+$/.test(id))
        res.end("Mauvais id")

    let message = req.body.message
    let completion = req.body.completion
    if (!message || /^ *$/.test(message))
        message = false
    if (!completion || /^ *$/.test(completion) || (completion != "done" && completion != "not done"))
        completion = false
    
    Todos.patchTodo(id, completion, message)
    .then(() => { 
        res.format({
            html: () => {  res.redirect('/todos') },
            'application/json': () => { res.json({status: 'success'}) }
        })
    })
    .catch(() => res.json({status: 'failed'}))
})

module.exports = router