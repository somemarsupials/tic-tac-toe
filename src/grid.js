'use strict';

const squareModule = require('./square');
const selectionModule = require('./selection');

class Grid {
  constructor(length, array) {
    this._length = length;
    this._columns = array;
  };

  get length() {
    return this._length;
  };

  filter(func, constructor = selectionModule.makeSelection) {
    let squares = this._asArray().filter(func);
    return constructor(squares);
  };

  index(x, y) {
    return this._columns[x] ? this._columns[x][y] : undefined;
  };

  move(x, y, value) {
    this.index(x, y).move(value);
  };

  _asArray() {
    return [].concat.apply([], this._columns);
  };

};

class GridBuilder {
  constructRow(columnId, length, constructor) {
    let row = [];
    for (let rowId = 0; rowId < length; rowId++) {
      row.push(constructor(columnId, rowId));
    };
    return row;
  };

  construct(length, constructor = squareModule.makeSquare) {
    let columns = [];
    for (let columnId = 0; columnId < length; columnId++) {
      columns.push(this.constructRow(columnId, length, constructor));
    };
    return columns;
  };
};

function makeGrid(length, constructor = Grid, builder = new GridBuilder()) {
  let array = builder.construct(length, constructor);
  return new constructor(length, array);
};

module.exports.makeGrid = makeGrid;
module.exports.GridBuilder = GridBuilder;
module.exports.Grid = Grid;
