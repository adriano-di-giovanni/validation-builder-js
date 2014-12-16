# validation-builder-js

A Javascript Universal Module to build reusable validation patterns

## Installation

You may want to install `validation-builder-js` using `npm` or `bower`.

`npm install validation-builder-js --save`

`bower install validation-builder-js --save`

## Basic usage

This package is suitable for use with in [Node.js](#node) and [browsers](#browser).

It has not been tested on any browser yet.

### Node <a name="node"></a>

```javascript
var
	ValidationBuilder = require('validation-builder-js');

var
	v = ValidationBuilder
		.forge()
		.isNull()
		.isUndefined()
		.build(),
	r = v.run(null); // argument to run() is the subject of validation

console.log(r.forAll()); // false
console.log(r.forAny()); // true
console.log(r.forOne('isNull')); // true
```

### Browser <a name="browser"></a>

```html
<script src="underscore-min.js"></script>
<script src="ValidationBuilder.min.js"></script>
<script>
	var
		v = ValidationBuilder
			.forge()
			.isNull()
			.isUndefined()
			.build(),
		r = v.run(null); // argument to run() is the subject of validation

	console.log(r.forAll()); // false
	console.log(r.forAny()); // true
	console.log(r.forOne('isNull')); // true
</script>
```

## Built-in validators

* [containsAll(compareArray)](#containsAll)
* [containsAny(compareArray)](#containsAny)
* [isArray()](#isArray)
* [isNull()](#isNull)
* [isUndefined()](#isUndefined)

### containsAll <a name="containsAll"></a>

```javascript
var
	subjectArray = [ 'a', 'b', 'c' ],
	compareArray = [ 'a' ],
	v = ValidationBuilder
		.forge()
		.containsAll(compareArray),
	r = v.run(subjectArray); // does subjectArray contain all elements in compareArray?

console.log(r.forAll()); // true
```

### containsAny <a name="containsAny"></a>

```javascript
var
	subjectArray = [ 'a', 'b', 'c' ],
	compareArray = [ 'a' ],
	v = ValidationBuilder
		.forge()
		.containsAny(compareArray),
	r = v.run(subjectArray); // does subjectArray contain any of the elements in compareArray?

console.log(r.forAll()); // true
```

## Custom validators

You can implement your own validator and register it to `ValidationBuilder` as follows:

```javascript
ValidationBuilder.register('isNull', function (subject) {
	return subject === null;
});
```

Custom validator will be available to any new instance of `ValidationBuilder`.

Your validator should meet following requirements

* accept subject of validation as first argument;
* validate any argument;
* only return a boolean value;
* not to throw any error.
