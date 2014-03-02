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
        ko = 'date';
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
      this.update(kindof(x));
    }
  });

  return described;
};

dj.flatten = function (obj) {
  var result = [];
  traverse(obj).map(function (x) {
    if (kindof(x) === 'array' && !this.isRoot) {
      this.array = true;
      this.value = x;
    }
    if (kindof(x) !== 'object') {
      if (kindof(x) === 'array') {

      }
      else if (this.parent && !this.parent.array)
        result.push([this.path.join('.'), x, kindof(x)]);
      else if (this.parent && this.parent.array) {
        if (!this.parent.handled) {
          this.parent.handled = true;
          var _flatten = dj.flatten(this.parent.value);
          var batched = [];
          _flatten.forEach(function (f) {
            batched.push([f[1], f[2]]);
          });

          result.push([this.parent.path.join('.'), batched]);
        }
      }
      //else
      //  result.push([this.path.join('.'), x, kindof(x)]);
    }
  });
  return result;
};

