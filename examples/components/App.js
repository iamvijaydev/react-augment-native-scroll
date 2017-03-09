import React, {Component} from 'react'
import { Link } from 'react-router'
require('../scss/styles.scss')

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>This is header</header>
                <main>
                    <ul>
                        <li><Link to="/connect-scrolls">Connect Scrolls</Link></li>
                        <li><Link to="/kinetic-scroll">Kinetic Scroll</Link></li>
                    </ul>
                    <div>{this.props.children}</div>
                </main>
                <footer>This is footer</footer>
            </div>
        )
    }
}