export function fixRequestAnimationFrame () {

}

export function findMatchingTarget (target, nodes) {
    let found;

    if ( ! nodes.length || target.tagName === 'BODY' ) {
        return 'BODY';
    }

    found = nodes.find(function (node) {
        return node.id === target.id
    });

    if ( found ) {
        return target.id;
    } else {
        return findMatchingTarget(target.parentElement, nodes);
    }
}

export function getPoint (event, hasTouch) {
    let point;

    if ( hasTouch && event.touches.length ) {
        point = {
            x : event.touches[0].clientX,
            y : event.touches[0].clientY
        }
    } else {
        point = {
            x : event.clientX,
            y : event.clientY
        }
    }

    return point;
}

export const getTime = Date.now || function getTime () {
    return new Date().getTime();
}

export function preventDefaultException (el, exceptions) {
    for ( let i in exceptions ) {
        if ( exceptions[i].test(el[i]) ) {
            return true;
        }
    }

    return false;
}

export function getMaxScroll (nodes) {
    let maxScrollLeft = 0,
        maxScrollTop = 0;

    nodes.forEach(function (node) {
        let $el = node.children[0];
        let maxScrollX = $el.scrollWidth - $el.clientWidth;
        let maxScrollY = $el.scrollHeight - $el.clientHeight;

        if ( maxScrollX > maxScrollLeft ) {
            maxScrollLeft = maxScrollX;
        }
        if ( maxScrollY > maxScrollTop ) {
            maxScrollTop = maxScrollY;
        }
    });

    return {
        left: maxScrollLeft,
        top: maxScrollTop
    }
}