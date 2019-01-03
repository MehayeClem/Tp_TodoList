const router = require('express').Router()
const Users = require('./../models/users')


router.post('/',(res, req) => {
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    if (!firstname || /^ *$/.test(firstname))
    res.end("Mauvaises valeurs")
    if (!lastname || /^ *$/.test(lastname))
    res.end("Mauvaises valeurs")
    if (!username || /^ *$/.test(username))
    res.end("Mauvaises valeurs")
    if (!password || /^ *$/.test(password))
    res.end("Mauvaises valeurs")
    if (!email || /^ *$/.test(email))
    res.end("Mauvaises valeurs")

    generateHash(password)
    
    Users.createUser(firstname, lastname, username, password, email)
    .then(() => { 
        res.format({
            html: () => { res.redirect('/users') },
            'application/json': () => { res.json({status: 'success'}) }
        })
})
    .catch(() => res.json({status: 'failed'}))
})


router.get('/add',(req, res) => {
    res.render('users/edit',{
        id:"",
        title:"Ajouter un utilisateur",
        _method:"POST"
    });
})

router.get('/:userId/edit',(req, res)=> {
    let id = req.params.todoId
    if (!/^[0-9]+$/.test(id))
    res.end("Mauvais id")

    Users.findTodo(id)
    .then((success) =>
    res.format({
        html: () => {
            res.render('users/show', {
                todo: success
            })
        },
        'application/json': () => {res.json(success)}
    })
)
.catch(() => res.json({status: 'failed'}))
})

router.get('/', (req, res) => {
    let limit = req.query.limit
    let offset = req.query.offset

    Users.getAll(limit, offset)
    .then((success) =>
        res.format({
            html: () => {
                res;render('todos/index' , {
                    todos: success
                })
            },
            'application/json' : () => {res.json(success)}
        })
    )
    .catch(() => res.json ({status: 'failed'}))
})

router.delete('/:userId',(req, res) => {
    let id = req.params.todoId
    if (!/^[0-9]+$/.test(id))
        res.end("Mauvais id")
    
    Users.deleteUser(id)
    .then(() => {
        res.format({
            html: () => { res.redirect(303, '/users') },
            'application/json': () => { res.json({status: 'success'})}
        })
    })
    .catch(() => res.json({status: 'failed'}))
})

router.patch('/:userId' , (req, res, next) => {
    let id = req.params.userId
    if(!/^[0-9]+$/.test(id))
        res.end("Mauvais id")

    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    if (!firstname || /^ *$/.test(firstname))
    firstname= false
    if (!lastname || /^ *$/.test(lastname))
    lastname= false
    if (!username || /^ *$/.test(username))
    username= false
    if (!password || /^ *$/.test(password))
    password= false
    if (!email || /^ *$/.test(email))
    email= false

    Users.patchUser(id, firstname, lastname, username, password, email)
    .then(() => {
        res.format({
            html: () => { res.redirect('/users')},
            'application/json': () => {res.json({status: 'success'})}
        })
    })
    .catch(() => res.json({status: 'failed'}))
})

module.exports = router