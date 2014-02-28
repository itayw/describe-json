var
  kindof = require('kindof'),
  traverse = require('traverse');

var dj = exports;

dj.describe = function (obj) {
  var described = traverse(obj).map(function (x) {
    if (!this.isRoot && this.isLeaf) {
      this.update(kindof(x))
    }
  });

  return described;
};
