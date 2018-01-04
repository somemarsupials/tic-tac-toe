'use strict';

const selectionModule = require('../src/selection');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Selection', function() {
  let selection;

  beforeEach(function() {
    selection = new selectionModule.Selection([1, 1, 1]);
  });

  describe('#new', function() {
    it('has array', function() {
      expect(selection._array).to.have.same.members([1, 1, 1]);
    });
  });

  describe('#array (get)', function() {
    it('returns _array', function() {
      expect(selection.array).to.have.same.members([1, 1, 1]);
    });
  });

  describe('#isComplete', function() {
    describe('when complete', function() {
      beforeEach(function() {
        sinon.stub(selection, '_moves').returns([1, 1, 1]);
      });

      it('returns true', function() {
        expect(selection.isComplete()).to.be.true;
      });
    });

    describe('when incomplete', function() {
      beforeEach(function() {
        sinon.stub(selection, '_moves').returns([1, 2, 1]);
      });

      it('returns false', function() {
        expect(selection.isComplete()).to.be.false;
      });
    });
    
    describe('when blank', function() {
      beforeEach(function() {
        sinon.stub(selection, '_moves').returns(
          [undefined, undefined, undefined]
        );
      });

      it('returns false', function() {
        expect(selection.isComplete()).to.be.false;
      });
    });
  });
});

describe('#makeSelection', function() {
  let selection;

  beforeEach(function() {
    selection = sinon.spy();
    selectionModule.makeSelection(2, 1, selection);
  });

  it('passes parameters', function() {
    expect(selection.calledWith(2, 1)).to.be.true;
  });
});
