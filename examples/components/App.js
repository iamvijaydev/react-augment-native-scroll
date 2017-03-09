import React, {Component} from 'react'
require('../scss/styles.scss')

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}