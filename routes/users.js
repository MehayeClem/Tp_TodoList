const router = require('express').Router()
const Users = require('./../models/users')


router.post('/',(req, res) => {
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    if (!firstname || /^ *$/.test(firstname))
    res.end("Mauvaises valeurs firstname")
    if (!lastname || /^ *$/.test(lastname))
    res.end("Mauvaises valeurs lastname")
    if (!username || /^ *$/.test(username))
    res.end("Mauvaises valeurs username")
    if (!password || /^ *$/.test(password))
    res.end("Mauvaises valeurs password")
    if (!email || /^ *$/.test(email))
    res.end("Mauvaises valeurs email")

    hashPwd = Users.generateHash(password)
    
    Users.createUser(firstname, lastname, username, hashPwd, email)
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
    let id = req.params.userId
    if (!/^[0-9]+$/.test(id))
        res.end("Mauvais id")

    Users.findUser(id)
    .then((success) =>
    res.format({
        html: () => {
            res.render('users/edit', {
                id: req.params.userId,
                title: "Modifier un User",
                _method: "PATCH",
                user: success
            })
        },
        'application/json': () => {res.json(success)}
    })
)
.catch(() => res.json({status: 'failed'}))
})

router.get('/:userId', (req, res) => {
    let id = req.params.userId
    if (!/^[0-9]+$/.test(id))
        res.end("Mauvais id")

    Users.findUser(id)
    .then((success) => 
        res.format({
            html: () => { 
                res.render('users/show', {
                    user: success
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

    Users.getAll(limit, offset)
    .then((success) =>
        res.format({
            html: () => {
                res.render('users/index' , {
                    users: success
                })
            },
            'application/json' : () => {res.json(success)}
        })
    )
    .catch(() => res.json ({status: 'failed'}))
})

router.get('/:userId/todos', (req, res) => {
    let userId = req.params.userId

    Users.getTodos(userId)
    .then((success) =>
        res.format({
            html: () => {
                res.render('todos/index' , {
                    todos: success
                })
            },
            'application/json' : () => {res.json(success)}
        })
    )
    .catch(() => res.json ({status: 'failed'}))
})

router.delete('/:userId',(req, res) => {
    let id = req.params.userId
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

router.patch('/:userId' , (req, res) => {
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