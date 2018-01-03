'use strict';

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };

  isTaken() {
    return Boolean(this._move);
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
