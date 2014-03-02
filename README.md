# describe-json [![Build Status][3]][4] [![Coverage Status][1]][2]

#### Describes a JSON object metadata 

[![browser support](https://ci.testling.com/itayw/describe-json.png)
](https://ci.testling.com/itayw/describe-json)

The library takes a JSON object and returns it's metadata in several useful ways.   
I've developed this package as part of the [joola.io project][joola.io] to handle the transformation of JSON rich documents into NoSQL datastores.
This process requires some descriptive attributes for each of the JSON nodes and this library assists in this process.

**describe-json** uses two libraries for traversing the JSON and parsing its metadata, [traverse][traverse] which iterates over the JSON object and [kindof][kindof] which is used to determine the typeof the value.

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
  nested: { number: 'number', string: 'string', date: 'date' } 
}
```

### Install

```bash
$ npm install describe-json
```

## API

### `describe-json.describe (obj)`
Generates a metadata representation of the provided JSON object.

Accepts `obj` which is a JSON object and traverses it to return another JSON object containing the metadata.  

- Arrays are returned with their contents expanded and each replaced with the metadata of the array item value.
- Strings are parsed in attempt to cast them as a valid date.
- Root is not parsed and returned. 

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
  nested: { number: 'number', string: 'string', date: 'date' } 
}
```

### `describe-json.flatten (obj)`
Returns an `array` of `[key, value]` containing all leaf node values.

```js
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
    bb: ['cc']
  }
};
```
Results with:
```js
[ 
  [ 'level0', 1 ], 
  [ 'a.b.c.d', 1 ], 
  [ 'aa.bb', [ 'cc' ] ] 
]
```

### Contributing
I would love to get your help and have outlined a simple Contribution Policy to support a transparent and easy merging of ideas, code, bug fixes and features.
If you're looking for a place to start, you can always go over the list of open issues, pick one and get started. If you're feeling lost or unsure, just let me know.

###License
Copyright (c) 2014 Itay Weinberger. MIT Licensed, see LICENSE for details.


[1]: https://coveralls.io/repos/itayw/describe-json/badge.png?branch=master
[2]: https://coveralls.io/r/itayw/describe-json?branch=master
[3]: https://travis-ci.org/itayw/describe-json.png?branch=master
[4]: https://travis-ci.org/itayw/describe-json?branch=master

[joola.io]: http://github.com/joola/joola.io
[traverse]: https://github.com/substack/js-traverse
[kindof]: https://github.com/moll/js-kindof