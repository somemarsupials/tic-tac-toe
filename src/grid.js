'use strict';

const squareModule = require('./square');
const selectionModule = require('./selection');

class Grid {
  constructor(length, constructor = squareModule.makeSquare) {
    this._length = length;
    this._construct(length, constructor);
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
