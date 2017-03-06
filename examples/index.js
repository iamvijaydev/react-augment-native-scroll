import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './components/App'
import Home from './components/Home'
import ConnectScrollsExample from './components/ConnectScrollsExample'
import KineticScrollExample from './components/KineticScrollExample'

render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="connect-scrolls" component={ConnectScrollsExample} />
                <Route path="kinetic-scroll" component={KineticScrollExample} />
            </Route>
        </Router>
    ),
    document.querySelector('#root')
)