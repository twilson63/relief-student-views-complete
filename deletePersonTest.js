const dalMySQL = require('./DAL/my-sql.js');

var dataToDelete = [
    {
        _id: '20'
    }
]

function callback(msgHeader) {
    return function(err, response) {
        if (err)
            return console.log('ERROR:\n', err.message)
        return console.log(msgHeader, response)
    }
}

dataToDelete.forEach(function(person) {
    dalMySQL.deletePerson(person, callback('PERSON DELETED:\n'))
})
