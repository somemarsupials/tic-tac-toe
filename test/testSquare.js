'use strict';

const squareModule = require('../src/square');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Square', function() {
  let square;

  beforeEach(function() {
    square = new squareModule.Square(1, 2);
  });

  describe('#new', function() {
    it('is created with x', function() {
      expect(square.x).to.equal(1);
    });

    it('is created with y', function() {
      expect(square.y).to.equal(2);
    });
  });

  describe('#isTaken', function() {
    describe('when taken', function() {
      beforeEach(function() {
        square.move = true;
      });

      it('returns true', function() {
        expect(square.isTaken()).to.be.true;
      });
    });

    describe('when not taken', function() {
      it('returns false', function() {
        expect(square.isTaken()).to.be.false;
      });
    });
  });
  
  describe('#move (get)', function() {
    beforeEach(function() {
      square._move = 5;
    });

    it('returns _move', function() {
      expect(square.move).to.equal(5);
    });
  });

  describe('#move (set)', function() {
    beforeEach(function() {
      square.move = 5; 
    });

    it('sets _move value', function() {
      expect(square._move).to.equal(5);
    });
  });
});
