const React = require('react')
const { BrowserRouter, Match, Link } = require('react-router')
const Home = require('./pages/home')
const About = require('./pages/about')

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/persons">Persons</Link>
          <Link to="/persons/new">New</Link>
          <Link to="/persons/:id">Show</Link>

          <Match exactly pattern="/" component={Home} />
          <Match pattern="/about" component={About} />
        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
