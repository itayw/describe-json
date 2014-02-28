var dj = require('../../lib/describejson');

describe('given an object', function () {
  before(function () {
    this.obj = {
      number: 1,
      string: 'string',
      date: new Date(),
      array: [1, '2', [1, 2]],
      nested: {
        number: 1,
        string: 'string',
        date: new Date()
      }
    }
  });

  it("should describe a JSON object", function () {
    var _obj = dj.describe(this.obj);
    expect(_obj).to.be.ok;
    console.log(_obj);
  });
});