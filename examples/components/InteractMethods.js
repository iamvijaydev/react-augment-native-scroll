import React, {Component} from 'react'

export default class InteractMethods extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false,
            scrollToLeft: '',
            scrollToTop: '',
            scrollByLeft: '',
            scrollByTop: ''
        }

        this.toggleState = this.toggleState.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    toggleState() {
        this.setState({
            toggle: ! this.state.toggle,
            scrollToLeft: '',
            scrollToTop: '',
            scrollByLeft: '',
            scrollByTop: ''
        })
    }

    onChange(item, event) {
        this.setState({ [item]: event.target.value });
    }

    render() {
        let clsName = this.state.toggle ? 'interact interact--open' : 'interact';
        let { scrollToStart, scrollToStartLeft, scrollToStartTop, scrollToEnd, scrollToEndLeft, scrollToEndTop, scrollToPosition, scrollByValue } = this.props.inst;

        let { scrollToLeft, scrollToTop, scrollByLeft, scrollByTop } = this.state;

        return (
            <div className={clsName}>
                <span className="interact__toggle" onClick={this.toggleState}>&#9868;</span>
                <ul className="interact__list brand-scrollbar">
                    <li className="interact__item interact__title">Exposed Methods</li>
                    <li className="interact__item">
                        <button className="form-item interact__button" onClick={scrollToStart} title="Scroll all areas to start, horizontally and vertically">Scroll To Start</button>
                    </li>
                    <li className="interact__item">
                        <button className="form-item interact__button" onClick={scrollToStartLeft} title="Scroll all areas to start-left, horizontally only">Scroll To Start Left</button>
                    </li>
                    <li className="interact__item">
                        <button className="form-item interact__button" onClick={scrollToStartTop} title="Scroll all areas to start-top, vertically only">Scroll To Start Top</button>
                    </li>
                    <li className="interact__item">
                        <button className="form-item interact__button" onClick={scrollToEnd} title="Scroll all areas to end, horizontally and vertically">Scroll To End</button>
                    </li>
                    <li className="interact__item">
                        <button className="form-item interact__button" onClick={scrollToEndLeft} title="Scroll all areas to end-left, horizontally only">Scroll To End Left</button>
                    </li>
                    <li className="interact__item">
                        <button className="form-item interact__button" onClick={scrollToEndTop} title="Scroll all areas to end-top, vertically only">Scroll To End Top</button>
                    </li>
                    <li className="interact__item">
                        <input className="form-item interact__input" type="text" placeholder="Left value" value={scrollToLeft} onChange={this.onChange.bind(this, 'scrollToLeft')} />
                        <input className="form-item interact__input" type="text" placeholder="Top value" value={scrollToTop} onChange={this.onChange.bind(this, 'scrollToTop')} />
                        <button className="form-item interact__button" onClick={() => scrollToPosition(scrollToLeft, scrollToTop)} title="Scroll to the positions provided">Scroll To Position</button>
                    </li>
                    <li className="interact__item">
                        <input className="form-item interact__input" type="text" placeholder="Left value" value={scrollByLeft} onChange={this.onChange.bind(this, 'scrollByLeft')} />
                        <input className="form-item interact__input" type="text" placeholder="Top value" value={scrollByTop} onChange={this.onChange.bind(this, 'scrollByTop')} />
                        <button className="form-item interact__button" onClick={() => scrollByValue(scrollByLeft, scrollByTop)} title="Scroll to new positions by adding the value provided to current positions">Scroll By Value</button>
                    </li>
                    <li className="interact__item interact__title">
                        <a href="https://github.com/iamvijaydev/ng-augment-native-scroll"><img src="https://img.shields.io/badge/Github-v0.13.2-brightgreen.svg" alt="Github version" height="18" /></a>
                        <a href="https://badge.fury.io/js/ng-augment-native-scroll"><img src="https://badge.fury.io/js/ng-augment-native-scroll.svg" alt="npm version" height="18" /></a>
                        <a href="https://badge.fury.io/bo/ng-augment-native-scroll"><img src="https://badge.fury.io/bo/ng-augment-native-scroll.svg" alt="Bower version" height="18" /></a>
                    </li>
                </ul>
            </div>
        )
    }
}