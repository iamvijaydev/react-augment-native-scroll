import React, {Component} from 'react'
import KineticScroll from '../../src/components/KineticScroll';
import InteractMethods from './InteractMethods';

export default class KineticScrollExample extends Component {
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
    }

    generateState() {
        let scrollInst = {};
        let table = [];

        for ( let i = 0; i < 70; i++ ) {
            let row = [];

            for( let j = 0; j < 100; j++ ){
                row.push( Math.floor(Math.random() * 16) + 5 );
            }

            table.push(row);
        }

        return {
            scrollInst,
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
                <KineticScroll name="kinetic-scrolls-example" options={options}>
                    <div data-scroll-area="kinetic-scrolls-example" className="table-wrap table-wrap--alone brand-scrollbar">
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
                </KineticScroll>
                <InteractMethods inst={this.state.scrollInst} />
            </div>
        )
    }
}