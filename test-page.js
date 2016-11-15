const dalNoSQL = require('./DAL/no-sql.js')

var listPersonsCallback = function(err, response) {
    if (err)
        return console.log(err.message)
    console.log(JSON.stringify(response.rows, null, 2))
}

var sortBy = 'lastNameView'
var startKey = ''
var limit = 2

dalNoSQL.listPersons(sortBy, startKey, limit, listPersonsCallback)
