var
  util = require('util'),
  chai = require('chai'),

  dj = require('../../lib/describejson');

chai.use(require('sinon-chai'));
expect = chai.expect;


describe('given an object', function () {
  before(function () {
    this.obj = {
      number: 1,
      string: 'string',
      date: new Date(),
      datestr: 'Sun Mar 02 2014 09:48:11 GMT+0200 (IST)',
      anotherdatestr: '2014-03-02T07:48:11',
      array: [1, '2', [1, 2]],
      nested: {
        number: 1,
        string: 'string',
        date: new Date()
      }
    };
  });

  it("should describe a JSON object", function () {
    var expected = { number: 'number',
      string: 'string',
      date: 'date',
      datestr: 'date',
      anotherdatestr: 'date',
      array: [ 'number', 'date', [ 'number', 'number' ] ],
      nested: { number: 'number', string: 'string', date: 'date' } };
    var actual = dj.describe(this.obj);
    expect(actual).to.deep.equal(expected);
  });

  it("should flatten JSON object", function () {
    var obj = {
      level0: 1,
      a: {
        b: {
          c: {
            d: 1
          }
        }
      },
      aa: {
        bb: ['cc', 'dd', 123]
      }
    };
    var expected = [
      [ 'level0', 1, 'number' ],
      [ 'a.b.c.d', 1 , 'number'],
      [ 'aa.bb', [
        [ 'cc', 'string' ],
        ['dd', 'string'],
        [123, 'number']
      ]]
    ];
    var actual = dj.flatten(obj);
    expect(actual).to.deep.equal(expected);
  });
});