# descirbe-json [![Build Status][3]][4] [![Coverage Status][1]][2]

#### Describes A JSON object

The library takes a JSON object and returns it's metadata.

```javascript
var djson = require('describe-json'); 
var obj = {
  number: 1,
  string: 'string',
  date: new Date(),
  array: [1, '2', [1, 2]],
  nested: {
    number: 1,
    string: 'string',
    date: new Date()
  }
};
console.log(djson.describe(obj));
```
Results with

```javascript
{ number: 'number',
  string: 'string',
  date: 'date',
  array: [ 'number', 'string', [ 'number', 'number' ] ],
  nested: { number: 'number', string: 'string', date: 'date' } }
```

### Install

```bash
$ npm install describe-json
```

### Contributing
I'd would love to get your help and have outlined a simple Contribution Policy to support a transparent and easy merging of ideas, code, bug fixes and features.
If you're looking for a place to start, you can always go over the list of open issues, pick one and get started. If you're feeling lost or unsure, just let me know.

###License
Copyright (c) 2014 Itay Weinberger. MIT Licensed, see LICENSE for details.


[1]: https://coveralls.io/repos/itayw/describe-json/badge.png?branch=master
[2]: https://coveralls.io/r/itayw/describe-json?branch=master
[3]: https://travis-ci.org/itayw/describe-json.png?branch=master
[4]: https://travis-ci.org/itayw/describe-json?branch=master