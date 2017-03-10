// import React from 'react';
import { expect } from 'chai';
// import { shallow, mount, render } from 'enzyme';
import { findMatchingTarget } from '../src/mics/utils';

var target = {
        id: 'WORLD',
        tagName: 'P'
    };
    var nodes = [{
        id: 'HELLO',
        parentElement: {
            id: 'BODY'
        }
    }];
    var result = findMatchingTarget(target, nodes);
    console.log( result );

describe('findMatchingTarget utils', function() {
    it('should return "BODY" without any arguments', function() {
        expect( findMatchingTarget() ).to.equal('BODY');
    });

    it('should return "BODY" when target is body', function() {
        var target = {
            tagName: 'BODY'
        };

        expect( findMatchingTarget() ).to.equal('BODY');
    });

    it('should return element id when target is matched', function() {
        var target = {
            id: 'HELLO',
            tagName: 'P'
        };
        var nodes = [{
            id: 'HELLO'
        }]

        expect( findMatchingTarget(target, nodes) ).to.equal('HELLO');
    });

    it('should return parent element id when target is not matched', function() {
        expect( result ).to.equal('WORLD');
    });
});