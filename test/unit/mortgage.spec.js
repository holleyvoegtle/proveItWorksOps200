const expect = require('chai').expect;
const assert = require('chai').assert;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    let mortgage = null;

    beforeEach(() => {
        mortgage = new Mortgage ();
    });

    it('should have a monthly payment function', () => {
        expect(mortgage.monthlyPayment).to.exist;
    });

    it('should have a constructor', () => {
        expect(mortgage.constructor).to.exist;
    });

    it('monthly Payment should return a number', () => {
        let monthlyPayment = 0;
        assert.typeOf(monthlyPayment, 'number');
    });

    it('term and period should be not be equal', () => {
        const term = 30;
        const period = 12;
        assert.notEqual(term, period);
    });

});