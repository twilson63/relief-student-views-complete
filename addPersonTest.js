/*jshint esversion: 6 */
////////////////////
//     My SQL
////////////////////

// To run program.js from terminal, ensure you are in the correct directory
//  and run the following command:
// $ NODE_ENV=production node addPerson.js

const dalMySQL = require('./DAL/my-sql.js');

// person data. Use to test the createPerson() function within your DAL,
// Make INDIVIDUAL calls to the createPerson() function within your DAL
// with each person within the array.
const personData = [
    {
        firstName: "fsJames",
        lastName: "adfJones",
        phone: "843 555-1515",
        email: "adsfastevean@duke.edu",
        type: "person",
        active: true
    }, {
        firstName: "gadTimothy",
        lastName: "afJgones",
        phone: "843 555-1515",
        email: "gfdbstevean@duke.edu",
        type: "person",
        active: true
    }, {
        firstName: "fdsAndrea",
        lastName: "k7Johnston",
        phone: "843 555-1515",
        email: "agcstevean@duke.edu",
        type: "person",
        active: true
    }, {
        firstName: "asdfDerek",
        lastName: "adsfJohns",
        phone: "843-555-1515",
        email: "asdfstevean@duke.edu",
        type: "person",
        active: true
    }

]

function callback(msgHeader) {
    return function(err, response) {
        if (err)
            return console.log('ERROR:\n', err.message)
        return console.log(msgHeader, response)
    }
}

personData.forEach(function(person) {
    dalMySQL.createPerson(person, callback('PERSON CREATED:\n'))
})
