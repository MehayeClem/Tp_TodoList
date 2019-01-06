const express = require('express')
const app = express()
const db = require('sqlite')
const bdParser = require('body-parser')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 8080
 
app.use(bdParser.json())
app.use(bdParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.set('views', './views')
app.set('view engine', 'pug')

db.open('todolist.db').then(() => {
    return Promise.all([
        db.run("CREATE TABLE IF NOT EXISTS todos (message, completion, createdAt, updatedAt, userId)"),
        db.run("CREATE TABLE IF NOT EXISTS users (firstname, lastname, username, password, email, createdAt, updatedAt)")
    ])
})
.then(() => { console.log('Database ready') })
.catch(() => console.log('Database not ready'))

app.all('/', (req, res, next) => {
    res.redirect('/todos')
    next()
})

app.use('/todos/', require('./routes/todos'))
app.use('/users/', require('./routes/users'))

app.all('*', (req, res) => {
    res.status(404)
    res.format({
        html: () => { res.render('404', {}) },
        'application/json': () => { res.json({status: '404 Not Found'}) }
    })
})

app.listen(PORT)
console.log("http://localhost:8080/todos")