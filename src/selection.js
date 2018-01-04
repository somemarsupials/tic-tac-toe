'use strict';

class Selection {
  constructor(array) {
    this._array = array;
  };

  get array() {
    return this._array;
  };

  isComplete() {
    let unique = this._unique(this._moves());
    return (unique.length == 1) && (unique[0] !== undefined)
  };

  _moves() {
    return this._array.map(function(item) { return item.move });
  };

  _unique(array) {
    return array.filter(function(value, index, self) { 
      return self.indexOf(value) === index;
    });
  };
};

function makeSelection(x, y, constructor = Selection) {
  return new constructor(x, y);
};

module.exports.makeSelection = makeSelection;
module.exports.Selection = Selection;
