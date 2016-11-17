const React = require('react')
const { BrowserRouter, Match } = require('react-router')
const PersonForm = require('./pages/persons/form')
const Persons = require('./pages/persons')
const ShowPerson = require('./pages/persons/show')
const Db = require('./components/db')

const App = React.createClass({
    render() {
        return (
          <BrowserRouter>
            <div className="avenir pa4 justify-center">
                <div>
                  <h3>Relief Tracker</h3>
                </div>
                <div>
                  <Match exactly pattern="/persons" component={Db(Persons)} />
                  <Match pattern="/persons/new" component={PersonForm} />
                  <Match pattern="/persons/:id/show" component={ShowPerson} />
                  {/*
                  <Match exactly pattern="/reliefefforts/" component={Persons} />
                  <Match pattern="/reliefefforts/new" component={PersonForm} />
                  <Match pattern="/reliefefforts/:id/show" component={ShowPerson} />
                  */}
              </div>
            </div>
          </BrowserRouter>
        )
    }
})

module.exports = App
