const dalMySQL = require('./DAL/my-sql.js');

var updatedData = [
    {
        "_id": 2,
        "name": "Canada 2000",
        "organizationID": "St. Andrews",
        "desc": "A trip to Canada",
        "start": "2000-07-02",
        "end": "2000-07-18",
        "phase": "completed"
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
    dalMySQL.updateReliefEffort(person, callback('PERSON UPDATED:\n'))
})
