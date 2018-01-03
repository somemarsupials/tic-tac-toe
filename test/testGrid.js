'use strict';

const gridModule = require('../src/grid');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Grid', function() {
  let grid;
  let square;

  beforeEach(function() {
    square = sinon.stub().returns(0);
    grid = new gridModule.Grid(0, square);
  });

  describe('#new', function() {
    let original;

    beforeEach(function() {
      original = gridModule.Grid.prototype._construct;
      gridModule.Grid.prototype._construct = sinon.spy();
      grid = new gridModule.Grid(3, square);
    });

    afterEach(function() {
      gridModule.Grid.prototype._construct = original;
    });

    it('has length', function() {
      expect(grid._length).to.equal(3);
    });

    it('calls _construct', function() {
      expect(grid._construct.calledWith(3, square)).to.be.true;
    });
  });

  describe('#_constructRow', function() {
    let row;
    let calls;

    beforeEach(function() {
      row = grid._constructRow(1, 3, square);
    });

    it('calls constructor 3 times', function() {
      for (let c = 0; c < 3; c++) {
        expect(square.calledWith(1, c)).to.be.true;
      };
    });

    it('puts squares in array', function() {
      expect(row).to.have.same.members([0, 0, 0]);
    });
  });

  describe('#_construct', function() {
    beforeEach(function() {
      sinon.stub(grid, '_constructRow').returns(0);
      grid._construct(3, square);
    });

    it('calls #_constructRow for each column', function() {
      for (let c = 0; c < 3; c++) {
        expect(grid._constructRow.calledWith(c, 3, square)).to.be.true;
      };
    });

    it('puts rows in array', function() {
      expect(grid._columns).to.have.same.members([0, 0, 0]);
    });
  });

  describe('#index', function() {
    beforeEach(function() {
      grid._columns = [[0, 0], [0, 1], [0, 0]];
    });

    it('retrieves item at given co-ordinates', function() {
      expect(grid.index(1, 1)).to.equal(1);
    });

    it('returns undefined if location does not exist', function() {
      expect(grid.index(5, 5)).to.be.undefined;
    });
  });
});

describe('#makeGrid', function() {
  let grid;

  beforeEach(function() {
    grid = sinon.spy();
    gridModule.makeGrid(5, grid);
  });

  it('passes parameters', function() {
    expect(grid.calledWith(5)).to.be.true;
  });
});