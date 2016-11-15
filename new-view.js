// new view that sorts relief effort by phase and name
// return json object containing
// relief effot name
// phase
// start date
// end date
const dalNoSQL = require('./DAL/no-sql.js')

var designDoc4 = {
    _id: '_design/reliefEffortPhase',
    views: {
        'reliefPhaseName': {
            map: function(doc) {
                if (doc.type === 'relief') {
                    emit([
                        doc.phase, doc.name
                    ], {
                        'name': doc.name,
                        "phase": doc.phase,
                        "start": doc.start,
                        "end": doc.end
                    })
                }
            }.toString()
        }
    }
}

dalNoSQL.createView(designDoc4, function callback(err, data) {
    if (err)
        return console.log(err);
    if (data) {
        console.log(data);
    }
})
