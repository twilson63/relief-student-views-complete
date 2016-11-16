const React = require('react')
//const PouchDB = require('pouchdb-http')
// const dbURL = process.env.REACT_APP_DB
// const db = PouchDB(dbURL)
const xhr = require('xhr')

const ResourceForm = React.createClass({
    getInitialState() {
        return {
            error: '',
            result: {},
            person: {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                //_id: new Date().toISOString(),
                //type: 'person',
                //active: true
            }
        }
    },
    postResults(person) {
        xhr.post('http://localhost:4000/persons', {
            json: person
        }, (e, r, b) => {
            if (e)
                return console.log(e)
            this.setState({person: b})
        })
    },
    handleChange(field) {
        return e => {
            let person = this.state.person
            person[field] = e.target.value
            this.setState({person})
        }
    },
    handleSubmit(e) {
        e.preventDefault()
        // db.put(this.state.person, (err, result) => {
        //     if (err)
        //         return this.setState({error: err.message})
        //     this.setState({result: result})
        // })
        this.postResults(this.state.person)
        // xhr({
        //     METHOD: 'POST',
        //     json: true,
        //     url: 'http://localhost:4000/persons/'
        // }, (err, res, body) => {
        //     console.log(body)
        //     if (err)
        //         console.log(err.message)
        //     this.setState({body: body})
        // })
        alert('working')
        console.log('This is the person at the end of xhr', this.state.person)
    },

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name</label>
                        <input onChange={this.handleChange('firstName')} value={this.state.person.firstName}/>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input onChange={this.handleChange('lastName')} value={this.state.person.lastName}/>
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input onChange={this.handleChange('phone')} value={this.state.person.phone}/>
                    </div>
                    <div>
                        <label>Email Address</label>
                        <input onChange={this.handleChange('email')} value={this.state.person.email}/>
                    </div>
                    <div>
                        <button>Add Person</button>
                    </div>
                </form>
                <hr/>
                <pre>{JSON.stringify(this.state.person, null, 2)}</pre>
                {this.setState.error}
                <pre>{JSON.stringify(this.setState.person, null, 2)}</pre>
            </div>
        )
    }
})

module.exports = ResourceForm
