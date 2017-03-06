import React, {Component} from 'react'
import { Link } from 'react-router'

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>This is Home</h1>
                <ul>
                    <li><Link to="/connect-scrolls">Connect Scrolls</Link></li>
                    <li><Link to="/kinetic-scroll">Kinetic Scroll</Link></li>
                </ul>
            </div>
        )
    }
}