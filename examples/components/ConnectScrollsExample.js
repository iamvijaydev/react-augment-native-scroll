import React, {Component} from 'react'
import ConnectScrolls from '../../src/ConnectScrolls';
import InteractMethods from './InteractMethods';

export default class ConnectScrollsExample extends Component {
    constructor(props) {
        super(props);

        this.state = this.generateState();
        
        this.getMethods = this.getMethods.bind(this);
        this.generateState = this.generateState.bind(this);
    }

    getMethods(scrollInst) {
        this.setState({
            scrollInst: scrollInst
        });

        setTimeout(() => {
            this.state.scrollInst.scrollToEnd();
        }, 2000)
    }

    generateState() {
        let scrollInst = {};
        let list = [];
        let table = [];

        for ( let i = 0; i < 70; i++ ) {
            let row = [];

            list.push( Math.random().toString(36).substring(7) );

            for( let j = 0; j < 100; j++ ){
                row.push( Math.floor(Math.random() * 16) + 5 );
            }

            table.push(row);
        }

        return {
            scrollInst,
            list,
            table
        }
    }

    componentDidMount() {
        document.body.classList.add('no-overflow')
    }

    componentWillUnmount() {
        document.body.classList.remove('no-overflow')
    }

    render() {
        let options = {
            movingAverage: 0.1,
            getMethods: this.getMethods
        }

        return (
            <div>
                <ConnectScrolls name="connect-scrolls-example" options={options}>
                    <div data-scroll-area="connect-scrolls-example" className="list brand-scrollbar">
                        <ul>
                            <li className="list__item list__item--head">Item & Item</li>
                            {
                                this.state.list.map((each, i) => {
                                    let modClsName = i % 10 === 0 ? 'list__item--strong' : i % 10 !== 0 ? 'list__item--normal' : '';

                                    return <li key={i} className={`list__item ${modClsName}`}>{each}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div data-scroll-area="connect-scrolls-example" className="table-wrap brand-scrollbar">
                        <table className="table-wrap__table">
                            <thead>
                                <tr className="table-wrap__tr">
                                    {
                                        this.state.table[0].map((cell, i) =>  <td key={i} className="table-wrap__td table-wrap__td--head">456</td>)
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.table.map((row, i) =>  {
                                        let modClsName = i % 10 === 0 ? 'table-wrap__td--strong' : i % 10 !== 0 ? 'table-wrap__td--normal' : '';

                                        return (
                                            <tr key={i} className="table-wrap__tr">
                                                {
                                                    row.map((cell, j) => <td key={j} className={`table-wrap__td ${modClsName}`}>{cell}</td>)
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </ConnectScrolls>
                <InteractMethods inst={this.state.scrollInst} />
            </div>
        )
    }
}