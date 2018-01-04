'use strict';

const gridModule = require('../src/grid');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Grid', function() {
  let array;
  let grid;

  beforeEach(function() {
    array = sinon.spy();
    grid = new gridModule.Grid(3, array);
  });

  describe('#new', function() {
    it('has length', function() {
      expect(grid._length).to.equal(3);
    });

    it('has columns', function() {
      expect(grid._columns).to.equal(array);
    });
  });

  describe('#length (get)', function() {
    it('returns _length', function() {
      expect(grid.length).to.equal(3);
    });
  });

  describe('#filter', function() {
    let selectionConstructor;
    let arr;
    let outcome;

    beforeEach(function() {
      selectionConstructor = sinon.stub().returns(0);  
      arr = { filter: sinon.stub().returns(1) };
      sinon.stub(grid, '_asArray').returns(arr);
      outcome = grid.filter(2, selectionConstructor);
    });

    it('applies filter function', function() {
      expect(arr.filter.calledWith(2)).to.be.true;
    });

    it('calls constructor with filtered array', function() {
      expect(selectionConstructor.calledWith(1)).to.be.true;
    });

    it('returns selection', function() {
      expect(outcome).to.equal(0);
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

  describe('#move', function() {
    let square;

    beforeEach(function() {
      square = { move: sinon.spy() }
      sinon.stub(grid, 'index').returns(square);
      grid.move(1, 2, 3);
    });

    it('passes indices to #index', function() {
      expect(grid.index.calledWith(1, 2)).to.be.true;
    });

    it('sets square move to value', function() {
      expect(square.move.calledWith(3)).to.be.true;
    });
  });

  describe('#_asArray', function() {
    beforeEach(function() {
      grid._columns = [[0, 0], [0, 1], [0, 0]];
    });

    it('flattens array', function() {
      expect(grid._asArray()).to.have.same.members([0, 0, 0, 1, 0 ,0]);
    });
  });
});

describe('GridBuilder', function() {
  let builder;
  let square;

  beforeEach(function() {
    builder = new gridModule.GridBuilder();
    square = sinon.stub().returns(0);
  });

  describe('#constructRow', function() {
    let row;

    beforeEach(function() {
      row = builder.constructRow(1, 3, square);
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

  describe('#construct', function() {
    let columns;

    beforeEach(function() {
      sinon.stub(builder, 'constructRow').returns(0);
      columns = builder.construct(3, square);
    });

    it('calls #_constructRow for each column', function() {
      for (let c = 0; c < 3; c++) {
        expect(builder.constructRow.calledWith(c, 3, square)).to.be.true;
      };
    });

    it('puts rows in array', function() {
      expect(columns).to.have.same.members([0, 0, 0]);
    });
  });
});

describe('#makeGrid', function() {
  let grid;
  let builder;

  beforeEach(function() {
    grid = sinon.spy();
    builder = { construct: sinon.stub().returns(0) };
    gridModule.makeGrid(5, grid, builder);
  });

  it('passes parameters', function() {
    expect(grid.calledWith(5, 0)).to.be.true;
  });
});
