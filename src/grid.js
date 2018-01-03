'use strict';

const squareModule = require('./square');

class Grid {
  constructor(length, squareConstructor = squareModule.makeSquare) {
    this._length = length;
    this._construct(length, squareConstructor);
  };

  get length() {
    return this._length;
  };

  get columns() {
    return this._columns;
  };

  index(x, y) {
    try {
      return this._columns[x][y];
    } catch (error) {
      return;
    };
  };

  _constructRow(columnNumber, length, constructor) {
    let newRow = [];
    for (let row = 0; row < length; row++) {
      newRow.push(constructor(columnNumber, row));
    };
    return newRow;
  };

  _construct(length, constructor) {
    this._columns = [];
    for (let column = 0; column < length; column++) {
      this._columns.push(this._constructRow(column, length, constructor));
    };
  };
};

function makeGrid(length, constructor = Grid) {
  return new constructor(length);
};

module.exports.makeGrid = makeGrid;
module.exports.Grid = Grid;
