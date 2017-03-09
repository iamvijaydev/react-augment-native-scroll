import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './components/Root'

const draw = Component => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
}

draw(Root)

if (module.hot) {
    module.hot.accept('./components/Root', () => { draw(Root) })
}