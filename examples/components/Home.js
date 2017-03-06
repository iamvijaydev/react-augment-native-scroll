import React, {Component} from 'react'
import { Link } from 'react-router'

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>This is header</header>
                <main>
                    <h1>This is Home</h1>
                    <ul>
                        <li><Link to="/connect-scrolls">Connect Scrolls</Link></li>
                        <li><Link to="/kinetic-scroll">Kinetic Scroll</Link></li>
                    </ul>
                </main>
                <footer>This is footer</footer>
            </div>
        )
    }
}