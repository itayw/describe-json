var
  util = require('util'),
  _kindof = require('kindof'),
  traverse = require('traverse');

var dj = module.exports = exports = traverse;

kindof = function (value) {
  var ko = _kindof(value);
  if (ko === 'string') {
    try {
      var dt = new Date(value);
      if (!isNaN(dt.getTime()))
        ko = 'date'
    }
    catch (ex) {
      //do nothing
    }
  }
  return ko;
};

dj.describe = function (obj) {
  var described = traverse(obj).map(function (x) {
    if (!this.isRoot && this.isLeaf) {
      this.update(kindof(x))
    }
  });

  return described;
};

dj.flatten = function (obj) {
  var result = [];

  var described = traverse(obj).map(function (x) {
    if (kindof(x) === 'array')
      this.array = true;
    if (kindof(x) !== 'object') {
      if (!this.parent.array)
        result.push([this.path.join('.'), x]);
    }
  });

  return result;
};

