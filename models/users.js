const db = require('sqlite')
const bcrypt = require('bcrypt')

module.exports = {
    getDate() {
        let d = new Date()
        let date = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        return date
    },
    createUser(firstname, lastname, username, password, email) {
        let date = module.exports.getDate()
        let query = "INSERT INTO users VALUES ('" + firstname + "' , '" + lastname + "' , '" + username + "' , '" + password + "' , '" + email + "' , '" + date + "' , '" + date + "')"
        return db.run(query)
    },
    findUser(id) {
        return db.get("SELECT rowid, * FROM users where rowid = " + id)
    },
    getAll(limit, offset) {
        let query ="SELECT rowid, * FROM users"

        if (/^[0-9]+$/.test(limit)) {
            if (!offset)
                offset = 0
            if (/^[0-9]+$/.test(offset))
                query += " LIMIT " + offset + "," + limit
        }
        
        return db.all(query)
    },
    deleteUser(id) {
        let query = "DELETE FROM users WHERE rowid = " + id
        return db.run(query)
    },
    patchUser(id, firstname, lastname, username, password, email) {
        let date =  module.exports.getDate()

        let query = "UPDATE users SET"
        if (firstname != false){
            query += ","    
        query += " firstname = '" + firstname + "'"
        }
        if (lastname != false){
            query += ","    
        query += " lastname = '" + lastname + "'"
        }
        if (username != false){
            query += ","    
        query += " username = '" + username + "'"
        }
        if (password != false){
            query += ","    
        query += " password = '" + password + "'"
        }
        if (email != false){
            query += ","    
        query += " email = '" + email + "'"
        }

        query += ", updated_at = '" + date + "' WHERE rowid = " + id
        return db.run(query)
    },
    generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    },
    validPassword(password) {
        return bcrypt.compareSync(password, this.local.password)
    }

}