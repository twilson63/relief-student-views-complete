const React = require('react')
const ResourceForm = require('./pages/resources/form')

const App = React.createClass({
    render() {
        return (
            <div className="avenir pa2 justify-center">
                <div>
                    <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
                        <nav className="f6 fw6 ttu tracked">
                            <a className="link dim white dib mr3" href="#" title="Home">Home</a>
                            <a className="link dim white dib mr3" href="#" title="About"></a>
                            <a className="link dim white dib mr3" href="#" title="Store"></a>
                            <a className="link dim white dib" href="#" title="Contact"></a>
                        </nav>
                    </header>
                </div>
                <div>
                    <h1 className="content-center mt6 pl4 mh5">Add Person</h1>
                    < ResourceForm/>
                </div>
            </div>
        )
    }
})

module.exports = App
