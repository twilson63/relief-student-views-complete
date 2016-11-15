const dalMySQL = require('./DAL/my-sql.js');

var updatedData = [
    {
        "firstName": "Seth",
        "lastName": "Davis",
        "email": "Dohnston@yale.edu",
        "phone": "843 555-1515",
        "active": true,
        "dateAdded": "2016-11-11",
        "_id": 15,
        "type": "person"
    }
]

function callback(msgHeader) {
    return function(err, response) {
        if (err) {
            return console.log('ERROR:\n', err.message)
        }
        if (response) {
            return console.log(msgHeader, response)
        }
    }
}

updatedData.forEach(function(person) {
    dalMySQL.updatePerson(person, callback('PERSON UPDATED:\n'))
})
