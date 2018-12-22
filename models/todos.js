const db = require('sqlite')

module.exports = {
    getDate() {
        let d = new Date()
        let date = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        return date
    },
    createTodo(message, completion) {
        let date = module.exports.getDate()
        let query = "INSERT INTO todos VALUES ('" + message + "', '" + completion + "', '" + date + "', '" + date + "')"
        return db.run(query)
    },
    findTodo(id) {
        return db.get("SELECT rowid, * FROM todos where rowid = " + id)
    },
    getAll(limit, offset, completion) {
        let query = "SELECT rowid, * FROM todos"

        if (completion == "done" || completion == "not done")
            query += " WHERE completion = '" + completion + "'"

        if (/^[0-9]+$/.test(limit)) {
            if (!offset)
                offset = 0
            if (/^[0-9]+$/.test(offset))
                query += " LIMIT " + offset + "," + limit
        }

        return db.all(query)
    },
    deleteTodo(id) {
        let query = "DELETE FROM todos WHERE rowid = " + id
        return db.run(query)
    },
    patchTodo(id, completion, message) {
        let date = module.exports.getDate()

        let query = "UPDATE todos SET"
        if (completion != false) 
            query += " completion = '" + completion + "'"
        else
            query += " completion = 'done'"
        
        if (message != false) {
            if (completion != false) 
                query += ","
            query += " message = '" + message + "'"
        }

        query += ", updated_at = '" + date + "' WHERE rowid = " + id
        return db.run(query)
    }
}