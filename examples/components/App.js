import React, {Component} from 'react'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>This is header</header>
                <main>{this.props.children}</main>
                <footer>This is footer</footer>
            </div>
        )
    }
}