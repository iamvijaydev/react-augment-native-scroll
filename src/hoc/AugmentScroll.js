import React, { Component, Children, PropTypes } from 'react'
import { getTime, getPoint, preventDefaultException, getMaxScroll } from '../mics/utils'
import defaultSettings from '../mics/defaultSettings'

export default function AugmentScroll (eventHandlers = []) {
    class AugmentedScroll extends Component {
        constructor(props) {
            super(props);

            this.hasTouch = 'ontouchstart' in window;
            this.options = {};

            this.$listener = undefined;
            this.childNodes = [];
            this.activeId = '';

            this.scrollLeft = 0;
            this.scrollTop = 0;
            this.lastScrollLeft = 0;
            this.lastScrollTop = 0;
            this.targetTop = 0;
            this.targetLeft = 0;

            this.velocityTop = 0;
            this.velocityLeft = 0;
            this.amplitudeTop = 0;
            this.amplitudeLeft = 0;

            this.timeStamp = 0;
            this.referenceX = 0;
            this.referenceY = 0;
            this.pressed = false;
            this.autoScrollTracker = null;
            this.isAutoScrolling = false;

            this.leftTracker = this.leftTracker.bind(this);
            this.topTracker = this.topTracker.bind(this);
            this.setScroll = this.setScroll.bind(this);
            this.autoScroll = this.autoScroll.bind(this);
            this.triggerAutoScroll = this.triggerAutoScroll.bind(this);
            this.cancelAutoScroll = this.cancelAutoScroll.bind(this);
            this.tap = this.tap.bind(this);
            this.swipe = this.swipe.bind(this);
            this.release = this.release.bind(this);

            this.exposeMethods = this.exposeMethods.bind(this);
            this.processChild = this.processChild.bind(this);
        }

        componentDidMount() {
            this.options = Object.assign(
                this.options,
                defaultSettings,
                this.props.options
            )

            if ( eventHandlers.length ) {
                eventHandlers.map(item =>  this.$listener.addEventListener( item.event, item.handler.bind(this), true ));
            }

            if ( ! this.hasTouch && this.options.enableKinetics ) {
                this.$listener.addEventListener( 'mousedown', this.tap, true );
            }

            if ( this.props.options.hasOwnProperty('getMethods') ) {
                this.props.options.getMethods( this.exposeMethods() );
            }
        }

        componentWillUnmount() {
            if ( eventHandlers.length ) {
                eventHandlers.map(item =>  this.$listener.removeEventListener( item.event, item.handler.bind(this) ));
            }

            if ( ! this.hasTouch && this.options.enableKinetics ) {
                this.$listener.removeEventListener( 'mousedown', this.tap );
            }
        }

        exposeMethods() {
            const scrollGen = (start, left, top) => {
                return function () {
                    let targetLeft = 0,
                        targetTop = 0,
                        amplitudeLeft = 0,
                        amplitudeTop = 0,
                        maxScroll = {};

                    if ( start ) {
                        targetLeft = left ? 0 : this.scrollLeft;
                        targetTop = top ? 0 : this.scrollTop;
                        amplitudeLeft = left ? -this.scrollLeft : 0;
                        amplitudeTop = top ? -this.scrollTop : 0;
                    } else {
                        maxScroll = getMaxScroll(this.childNodes);

                        targetLeft = left ? maxScroll.left : this.scrollLeft;
                        targetTop = top ? maxScroll.top : this.scrollTop;
                        amplitudeLeft = left ? maxScroll.left - this.scrollLeft : 0;
                        amplitudeTop = top ? maxScroll.top - this.scrollTop : 0;
                    }

                    this.triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
                }.bind(this)
            }

            const scrollToBy = (addTo) => {
                return function (left, top) {
                    let maxScroll, numLeft, corrLeft, numTop, corrTop, targetLeft, targetTop, moveLeft, moveTop, amplitudeLeft, amplitudeTop;

                    maxScroll = getMaxScroll(this.childNodes);

                    numLeft = parseInt(left);
                    numTop = parseInt(top);

                    corrLeft = isNaN( numLeft ) ? this.scrollLeft : (addTo ? numLeft + this.scrollLeft : numLeft);
                    corrTop = isNaN( numTop ) ? this.scrollTop : (addTo ? numTop + this.scrollTop : numTop);

                    targetLeft = corrLeft > maxScroll.left ? maxScroll.left : (corrLeft < 0 ? 0 : corrLeft);
                    targetTop = corrTop > maxScroll.top ? maxScroll.top : (corrTop < 0 ? 0 : corrTop);

                    moveLeft = this.scrollLeft - targetLeft !== 0 ? true : false;
                    moveTop = this.scrollTop - targetTop !== 0 ? true : false;

                    amplitudeLeft = moveLeft ? targetLeft - this.scrollLeft : 0;
                    amplitudeTop = moveTop ? targetTop - this.scrollTop : 0;

                    this.triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);
                }.bind(this)
            }
            const START = true,
                NOT_START = false,
                LEFT = true,
                NOT_LEFT = false,
                TOP = true,
                NOT_TOP = false,
                TO_VALUE = false,
                BY_VALUE = true;

            return {
                scrollToStart: scrollGen(START, LEFT, TOP),
                scrollToStartLeft: scrollGen(START, LEFT, NOT_TOP),
                scrollToStartTop: scrollGen(START, NOT_LEFT,TOP),
                scrollToEnd: scrollGen(NOT_START, LEFT, TOP),
                scrollToEndLeft: scrollGen(NOT_START, LEFT, NOT_TOP),
                scrollToEndTop: scrollGen(NOT_START, NOT_LEFT, TOP),
                scrollToPosition: scrollToBy(TO_VALUE),
                scrollByValue: scrollToBy(BY_VALUE)
            }
        }

        /**
         * Track the velocity along horizontal vector
         * 
         * @memberOf AugmentedScroll
         */
        leftTracker() {
            let now, elapsed, delta;

            now = getTime();
            elapsed = now - this.timeStamp;
            delta = this.scrollLeft - this.lastScrollLeft;

            this.timeStamp = now;
            this.lastScrollLeft = this.scrollLeft;

            this.velocityLeft = this.options.movingAverage * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityLeft;
        }

        /**
         * Track the velocity along vertical vector
         * 
         * @memberOf AugmentedScroll
         */
        topTracker() {
            let now, elapsed, delta;

            now = getTime();
            elapsed = now - this.timeStamp;
            delta = this.scrollTop - this.lastScrollTop;

            this.timeStamp = now;
            this.lastScrollTop = this.scrollTop;

            this.velocityTop = this.options.movingAverage * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityTop;
        }
        
        /**
         * Set the scroll value of the scroll areas
         * 
         * @param {number} left - scroll left value
         * @param {number} top - scroll top value
         * 
         * @memberOf AugmentedScroll
         */
        setScroll(left, top) {
            let correctedLeft = Math.round(left);
            let correctedTop = Math.round(top);
            
            this.childNodes.forEach(node => {
                if ( node ) {
                    let $el = node.children[0];
                    let maxScrollX = $el.scrollWidth - $el.clientWidth;
                    let maxScrollY = $el.scrollHeight - $el.clientHeight;

                    if ( maxScrollX > 0 && correctedLeft >= 0 && correctedLeft <= maxScrollX ) {
                        $el.scrollLeft = correctedLeft;
                        this.scrollLeft = correctedLeft;
                    }
                    if ( maxScrollY > 0 && correctedTop >= 0 && correctedTop <= maxScrollY ) {
                        $el.scrollTop = correctedTop;
                        this.scrollTop = correctedTop;
                    }
                }
            })
        }

        /**
         * Upon release auto scroll the scroll areas due to momentum
         * 
         * @memberOf AugmentedScroll
         */
        autoScroll() {
            let elapsed;
            let deltaY = 0, deltaX = 0, scrollX = 0, scrollY = 0;
            let TIME_CONST = 325;

            elapsed = getTime() - this.timeStamp;

            if ( this.amplitudeTop ) {
                deltaY = -this.amplitudeTop * Math.exp(-elapsed / TIME_CONST);
            }
            if ( this.amplitudeLeft ) {
                deltaX = -this.amplitudeLeft * Math.exp(-elapsed / TIME_CONST);
            }

            if ( deltaX > 0.5 || deltaX < -0.5 ) {
                scrollX = deltaX;
            } else {
                scrollX = 0;
            }

            if ( deltaY > 0.5 || deltaY < -0.5 ) {
                scrollY = deltaY;
            } else {
                scrollY = 0;
            }

            this.setScroll(this.targetLeft + scrollX, this.targetTop + scrollY);

            if ( scrollX !== 0 || scrollY !== 0 ) {
                this.autoScrollTracker = requestAnimationFrame(this.autoScroll);
            } else {
                this.isAutoScrolling = false;
                this.autoScrollTracker = null;
            }
        }

        /**
         * Start the auto scrolling of the scroll areas
         * 
         * @param {number} targetLeft - the final left value
         * @param {number} targetTop - the final top value
         * @param {number} amplitudeLeft - amplitude on horizontal vector
         * @param {number} amplitudeTop - amplitude on vertical vector
         * 
         * @memberOf AugmentedScroll
         */
        triggerAutoScroll (targetLeft, targetTop, amplitudeLeft, amplitudeTop) {
            if ( amplitudeLeft !== 0 || amplitudeTop !== 0 ) {
                this.cancelAutoScroll();

                this.timeStamp = getTime();
                this.targetLeft = targetLeft;
                this.targetTop = targetTop;
                this.amplitudeLeft = amplitudeLeft;
                this.amplitudeTop = amplitudeTop;

                this.isAutoScrolling = true;
                this.autoScrollTracker = requestAnimationFrame(this.autoScroll);
            }
        }

        /**
         * Stop the auto scrolling of the scroll areas
         * 
         * @memberOf AugmentedScroll
         */
        cancelAutoScroll() {
            if ( this.isAutoScrolling ) {
                cancelAnimationFrame(this.autoScrollTracker);
                this.isAutoScrolling = false;
                this.autoScrollTracker = null;
            }
        }

        /**
         * Event handler for when user taps the $litener
         * 
         * @param {object} event - the generated event
         * 
         * @memberOf AugmentedScroll
         */
        tap(event) {
            this.pressed = true;
            this.referenceX = getPoint(event, this.hasTouch).x;
            this.referenceY = getPoint(event, this.hasTouch).y;

            this.velocityTop = this.amplitudeTop = 0;
            this.velocityLeft = this.amplitudeLeft = 0;

            this.lastScrollTop = this.scrollTop;
            this.lastScrollLeft = this.scrollLeft;

            this.timeStamp = getTime();

            this.cancelAutoScroll();

            this.$listener.addEventListener( 'mousemove', this.swipe, true );
            this.$listener.addEventListener( 'mouseup', this.release, true );

            if ( preventDefaultException(event.target, this.options.preventDefaultException) ) {
                event.preventDefault();
            }
        }

        /**
         * Event handler for when user is swiping on $listener
         * 
         * @param {object} event - the generated event
         * 
         * @memberOf AugmentedScroll
         */
        swipe(event) {
            let x, y, deltaX, deltaY;

            if (this.pressed) {
                x = getPoint(event, this.hasTouch).x;
                y = getPoint(event, this.hasTouch).y;

                deltaX = this.referenceX - x;
                deltaY = this.referenceY - y;

                if (deltaX > 2 || deltaX < -2) {
                    this.referenceX = x;
                } else {
                    deltaX = 0;
                }
                if (deltaY > 2 || deltaY < -2) {
                    this.referenceY = y;
                } else {
                    deltaY = 0;
                }

                this.topTracker();
                this.leftTracker();

                this.setScroll( this.scrollLeft + deltaX, this.scrollTop + deltaY );
            }
        }

        release() {
            let targetLeft, targetTop, amplitudeLeft, amplitudeTop;

            this.pressed = false;

            this.topTracker();
            this.leftTracker();

            if (this.velocityLeft > 10 || this.velocityLeft < -10) {
                amplitudeLeft = 0.8 * this.velocityLeft;
                targetLeft = Math.round(this.scrollLeft + amplitudeLeft);
            } else {
                targetLeft = this.scrollLeft;
            }
            if (this.velocityTop > 10 || this.velocityTop < -10) {
                amplitudeTop = 0.8 * this.velocityTop;
                targetTop = Math.round(this.scrollTop + amplitudeTop);
            } else {
                targetTop = this.scrollTop;
            }

            this.triggerAutoScroll(targetLeft, targetTop, amplitudeLeft, amplitudeTop);

            this.$listener.removeEventListener( 'mousemove', this.swipe );
            this.$listener.removeEventListener( 'mouseup', this.release );
        }

        /**
         * Proocess each child and apply proper key and id
         * 
         * @param {object} child - a react node
         * @param {number} i - index of iteration
         * @returns {obect} react node
         * 
         * @memberOf AugmentedScroll
         */
        processChild(child, i) {
            const isScrollArea = () => child.props['data-scroll-area'] === this.props.name;

            let scrollArea = `${this.props.name}__SCROLL_AREA_${i}`;
            let key = isScrollArea() ? scrollArea : i;
            let id = isScrollArea() ? scrollArea : '';

            return (
                <span key={key}
                    id={id}
                    ref={
                        node => {
                            if ( isScrollArea() ) {
                                this.childNodes[i] = node
                            }
                        }
                    }
                >
                    {child}
                </span>
            )
        }

        render() {
            return (
                <span id={`${this.props.name}__RANS`}
                    ref={
                        $listener => { this.$listener = $listener }
                    }
                >
                    {
                        Children.map(this.props.children, (child, i) => this.processChild(child, i))
                    }
                </span>
            )
        }
    }

    AugmentedScroll.propTypes = {
        name: PropTypes.string.isRequired,
        options: PropTypes.object,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    }

    return AugmentedScroll;
}