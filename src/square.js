'use strict';

class Square {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  };

  isTaken() {
    return Boolean(this._move);
  };

  get x() {
    return this._x;
  };

  get y() {
    return this._y;
  };

  get move() {
    return this._move;
  };

  set move(value) {
    this._move = value;
  };
};

function makeSquare(x, y, constructor = Square) {
  return new constructor(x, y);
};

module.exports.makeSquare = makeSquare;
module.exports.Square = Square;
