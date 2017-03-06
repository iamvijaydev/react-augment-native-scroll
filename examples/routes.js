import { Router, Route, IndexRoute } from 'react-router'

import App from './components/App'
import Home from './components/Home'
import ConnectScrollsExample from './components/ConnectScrollsExample'
import KineticScrollExample from './components/KineticScrollExample'

export function Routes () {
    return (
        <Router history="{hashHistory}">
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="connect-scrolls" component={ConnectScrollsExample} />
                <Route path="kinetic-scroll" component={KineticScrollExample} />
            </Route>
        </Router>
    )
}