import React, {Component} from 'react'
import ConnectScrolls from '../../src/ConnectScrolls';

export default class ConnectScrollsExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollInst: null
        }

        this.getMethods = this.getMethods.bind(this);
    }

    getMethods(scrollInst) {
        this.setState({
            scrollInst: scrollInst
        });

        setTimeout(() => {
            this.state.scrollInst.scrollToEnd();
        }, 2000)
    }

    render() {
        let data = Array.from('x'.repeat(100));
        let options = {
            movingAverage: 0.3,
            getMethods: this.getMethods
        }

        return (
            <div>
                <h1>This is Connect Scrolls Example</h1>
                <ConnectScrolls name="sample" options={options}>
                    <ul data-scroll-area="sample" style={{ position: 'absolute', left: 0, right: '50%', top: '50px', bottom: 0, overflow: 'auto' }}>
                        {
                            data.map((e,i) => <li key={i}>{i}</li>)
                        }
                    </ul>
                    <ul data-scroll-area="sample" style={{ position: 'absolute', left: '50%', right: 0, top: '50px', bottom: 0, overflow: 'auto' }}>
                        {
                            data.map((e,i) => <li key={i}>{i}</li>)
                        }
                    </ul>
                </ConnectScrolls>
            </div>
        )
    }
}