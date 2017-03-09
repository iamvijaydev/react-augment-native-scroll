import { findMatchingTarget } from '../mics/utils'
import AugmentScroll from '../hoc/AugmentScroll'

const eventHandlers = [{
    event: 'ontouchstart' in window ? 'touchstart' : 'mouseover',
    handler: function(event) {
        this.activeId = findMatchingTarget(event.target, this.childNodes);
    }
}, {
    event: 'scroll',
    handler: function(event) {
        const target = event.target;
        let valX = undefined;
        let valY = undefined;

        if ( this.pressed || this.isAutoScrolling ) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if ( target.clientWidth !== target.scrollWidth ) {
            valX = target.scrollLeft;
            this.lastScrollLeft = this.scrollLeft;
            this.scrollLeft = valX;
        } else {
            valX = this.scrollLeft;
        }
        if ( target.clientHeight !== target.scrollHeight ) {
            valY = target.scrollTop;
            this.lastScrollTop = this.scrollTop;
            this.scrollTop = valY;
        } else {
            valY = this.scrollTop;
        }

        this.childNodes.forEach(node => {
            if ( node.id !== this.activeId ) {
                node.children[0].scrollLeft = valX;
                node.children[0].scrollTop = valY;
            }
        });
    }
}];

export default AugmentScroll(eventHandlers);