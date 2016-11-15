const mysql = require('mysql')
const path = require('path')
const fetchConfig = require('zero-config')
const R = require('ramda')

function createConnection() {
    return mysql.createConnection({host: "0.0.0.0", user: "root", password: "mypassword", database: "ReliefTracker"})
}

var dal = {
    getPerson: getPerson,
    listPersons: listPersons,
    updatePerson: updatePerson,
    createPerson: createPerson,
    deletePerson: deletePerson,
    //     createView: createView,
    getReliefEffort: getReliefEffort,
    listReliefEfforts: listReliefEfforts,
    updateReliefEffort: updateReliefEffort,
    createReliefEffort: createReliefEffort,
    deleteReliefEffort: deleteReliefEffort
}

/////////////////////////////////////////////////////////////////////
///////// PERSON FUNCTIONS //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

function getPerson(id, callback) {
    getDocByID('Person', id, convertPersonNoSQLFormat, callback)
}

function listPersons(tableName, searchCriteria, limit, callback) {
    queryDB(tableName, '', searchCriteria, limit, function(err, data) {
        if (err)
            return callback(err)
        if (data) {
            return callback(null, data.map(R.compose(parseToJSON, convertPersonNoSQLFormat)))
        }
    })
}

function listReliefEfforts(tableName, searchCriteria, limit, callback) {
    queryDB(tableName, '', searchCriteria, limit, function(err, data) {
        if (err)
            return callback(err)
        if (data) {
            return callback(null, data.map(R.compose(parseToJSON, convertReliefNoSQLFormat)))
        }
    })
}

function createPerson(data, callback) {
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400 Missing data for create'))
    } else if (data.hasOwnProperty('_id') === true) {
        return callback(new Error('400 Unnecessary id property within data. ' +
            'createPerson() will generate unique id'))
    } else if (data.hasOwnProperty('lastName') !== true) {
        return callback(new Error('400Missing lastName property within data'))
    } else if (data.hasOwnProperty('firstName') !== true) {
        return callback(new Error('400Missing firstName property within data'))
    } else if (data.hasOwnProperty('email') !== true) {
        return callback(new Error('400Missing email property within data'))
    } else {
        var connection = createConnection()
        connection.query('INSERT INTO Person SET ? ', prepDataForDB(data), function(err, result) {
            if (err)
                return callback(err)
            if (typeof result !== 'undefined' && result.insertID !== 'undefined') {
                return callback(null, {
                    ok: true,
                    id: result.insertID
                })
            }
        })
        connection.end(function(err) {
            if (err)
                return err
        })
    }
}
function updatePerson(data, callback) {
    console.log('This is going into update person', data)
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400 Missing data for update'))
    } else if (data.hasOwnProperty('_id') !== true) {
        return callback(new Error('400 Missing id property from data'))
    } else {
        var connection = createConnection()
        var ID = data._id
        delete data._id
        console.log('this is the var ID', ID)
        connection.query('UPDATE Person SET ? WHERE ID = ' + ID, prepDataForDB(data), function(err, result) {
            if (err) {
                return callback(err)
            }
            if (typeof result !== 'undefined' && result.affectedRows !== 0) {
                return callback(null, {
                    ok: true,
                    id: result.insertID
                })
            }
        })
        connection.end(function(err) {
            if (err)
                return (err)
        })
    }
}

function deletePerson(data, callback) {
    deleteDocByID('Person', JSON.parse(data)._id, callback)
}

/////////////////////////////////////////////////////////////////////
///////// RELIEF FUNCTIONS //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

function getReliefEffort(id, callback) {
    getDocByID('Relief', id, convertReliefNoSQLFormat, callback)
}

function listReliefEfforts(tableName, searchCriteria, limit, callback) {
    queryDB(tableName, '', searchCriteria, limit, function(err, data) {
        if (err)
            return callback(err)
        if (data) {
            return callback(null, data.map(R.compose(parseToJSON, convertReliefNoSQLFormat)))
        }
    })
}

function createReliefEffort(data, callback) {
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400Missing data for create'))
    } else if (data.hasOwnProperty('_id') === true) {
        return callback(new Error('400Unnecessary id property within data. ' +
            'createPerson() will generate unique id'))
    } else if (data.hasOwnProperty('name') !== true) {
        return callback(new Error('400Missing name property within data'))
    } else if (data.hasOwnProperty('organizationID') !== true) {
        return callback(new Error('400Missing organizationID property within data'))
    } else if (data.hasOwnProperty('phase') !== true) {
        return callback(new Error('400Missing phase property within data'))
    } else {
        var connection = createConnection()
        connection.query('INSERT INTO Relief SET ? ', prepDataForDB(data), function(err, result) {
            if (err)
                return callback(err)
            if (typeof result !== 'undefined' && result.insertID !== 'undefined') {
                return callback(null, {
                    ok: true,
                    id: result.insertID
                })
            }
        })
        connection.end(function(err) {
            if (err)
                return err
        })
    }
}

function updateReliefEffort(data, callback) {
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400 Missing data for update'))
    } else if (data.hasOwnProperty('_id') !== true) {
        return callback(new Error('400 Missing id property from data'))
    } else {
        var connection = createConnection()
        var ID = data._id
        delete data._id
        connection.query('UPDATE Relief SET ? WHERE ID = ' + ID, prepDataForDB(data), function(err, result) {
            if (err) {
                return callback(err)
            }
            if (typeof result !== 'undefined' && result.affectedRows !== 0) {
                return callback(null, {
                    ok: true,
                    id: result.insertID
                })
            }
        })
        connection.end(function(err) {
            if (err)
                return (err)
        })
    }
}

function deleteReliefEffort(data, callback) {
    deleteDocByID('Relief', JSON.parse(data)._id, callback)
}
/////////////////////////////////////////////////////////////////////
///////// HELPER FUNCTIONS //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

function prepDataForDB(data) {
    if (data.hasOwnProperty('active') === true) {
        data.active = data.active === true
            ? 1
            : 0
    }

    if (data.hasOwnProperty('type') === true) {
        delete data.type
    }
    return data;
}

function deleteDocByID(tablename, id, callback) {
    if (typeof id == "undefined" || id === null) {
        return callback(new Error('400Missing id property from data'))
    } else {
        var connection = createConnection()
        connection.query('DELETE FROM ' + connection.escapeId(tablename) + ' WHERE id = ?', [id], function(err, result) {
            if (err)
                return callback(err)
            if (result)
                return callback(null, {
                    ok: true,
                    id: id,
                    message: 'deleted rows'
                })
        })
        connection.end(function(err) {
            if (err)
                return (err)
        })
    }
}

function queryDB(tablename, sortBy, searchCriteria, limit, callback) {
    if (typeof searchCriteria == 'undefined' || searchCriteria === null) {
        return callback(new Error('400Missing search paramater'))
    } else if (typeof limit == 'undefined' || limit === null || limit === 0) {
        return callback(new Error('400Missing limit paramater'))
    } else {
        var connection = createConnection()
        var whereclause = searchCriteria === ''
            ? ''
            : ' WHERE sortToken > ? '
        connection.query('SELECT * FROM ' + connection.escapeId(tablename) + whereclause + ' ORDER BY sortToken ' + ' LIMIT ' + limit, [searchCriteria], function(err, data) {
            if (err) {
                return callback(err)
            }
            if (typeof data !== 'undefined' && data.length > 0) {
                return callback(null, data)
            }
        })
        connection.end(function(err) {
            if (err)
                return (err)
        })
    }
}

function getDocByID(tablename, id, formatter, callback) {
    if (typeof id == 'undefined' || id === null) {
        return callback(new Error('400Missing id paramater'))
    } else {
        var connection = createConnection()
        connection.query('SELECT * FROM ' + connection.escapeId(tablename) + ' WHERE id = ?', [id], function(err, data) {
            if (err)
                return callback(err)
            if (data.length === 0) {
                return callback({error: 'not_found', reason: 'missing', name: 'not_found', status: 404, message: 'missing'})
            }
            if (data) {
                return callback(null, JSON.stringify(formatter(data[0]), null, 2))
                //return callback(null, data.map(compose(parseToJSON, formatter))[0])
            }
        })
        connection.end(function(err) {
            if (err)
                return err
        })
    }
}

var convertPersonNoSQLFormat = function(person) {
    person.active = (person.active === 1
        ? true
        : false)
    person._id = person.ID
    person.type = 'person'
    delete person.ID
    return person
}

var convertReliefNoSQLFormat = function(relief) {
    relief.active = (relief.active === 1
        ? true
        : false)
    relief._id = relief.ID
    relief.type = 'relief'
    delete relief.ID
    return relief
}

function parseToJSON(data) {
    return JSON.parse(JSON.stringify(data))
}

module.exports = dal;
