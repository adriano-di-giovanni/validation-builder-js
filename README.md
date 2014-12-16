# validation-builder-js

A Javascript Universal Module to build reusable validation patterns.

This module is fully functional but it is more like a proof of concept due to the lack of validators.

However, you can implement your own validators or plug validators from other libraries in as described [later](#custom_validators).

This module depends on [underscorejs](http://underscorejs.org).

## Installation

You may want to install `validation-builder-js` using `npm` or `bower`.

`npm install validation-builder-js --save`

`bower install validation-builder-js --save`

## Basic usage

This module is suitable for use in [Node.js](#node) and [browser](#browser) environments.

It has been tested for use in Node.js.

It has not been tested on any browser yet.

### Node <a name="node"></a>

```javascript
var
	ValidationBuilder = require('validation-builder-js');

var
	validation = ValidationBuilder
		.forge() // creates a new instance of ValidationBuilder
		.isNull()
		.isUndefined()
		.build() // creates a new instance of Validation

	result = validation.run(null); // argument to run() is the subject of validation

console.log(result.forAll()); // false
console.log(result.forAny()); // true
console.log(result.forOne('isNull')); // true
```

### Browser <a name="browser"></a>

```html
<script src="underscore-min.js"></script>
<script src="ValidationBuilder.min.js"></script>
<script>
	var
		validation = ValidationBuilder
			.forge()
			.isNull()
			.isUndefined()
			.build(),
		result = validation.run(null); // argument to run() is the subject of validation

	console.log(result.forAll()); // false
	console.log(result.forAny()); // true
	console.log(result.forOne('isNull')); // true
</script>
```

## Built-in validators

* [containsAll(compareArray)](#containsAll)
* [containsAny(compareArray)](#containsAny)

### containsAll <a name="containsAll"></a>

```javascript
var
	subjectArray = [ 'a', 'b', 'c' ],
	compareArray = [ 'a' ],
	validation = ValidationBuilder
		.forge()
		.containsAll(compareArray),
	result = validation.run(subjectArray); // does subjectArray contain all elements in compareArray?

console.log(result.forAll()); // true
```

### containsAny <a name="containsAny"></a>

```javascript
var
	subjectArray = [ 'a', 'b', 'c' ],
	compareArray = [ 'a' ],
	validation = ValidationBuilder
		.forge()
		.containsAny(compareArray),
	result = validation.run(subjectArray); // does subjectArray contain any of the elements in compareArray?

console.log(result.forAll()); // true
```

## Proxied validators

ValidationBuilder proxies to Underscore.js to provide 16 validators.

* [isArguments](http://underscorejs.org/#isArguments)
* [isArray](http://underscorejs.org/#isArray)
* [isBoolean](http://underscorejs.org/#isBoolean)
* [isDate](http://underscorejs.org/#isDate)
* [isElement](http://underscorejs.org/#isElement)
* [isEmpty](http://underscorejs.org/#isEmpty)
* [isEqual](http://underscorejs.org/#isEqual)
* [isFinite](http://underscorejs.org/#isFinite)
* [isFunction](http://underscorejs.org/#isFunction)
* [isNaN](http://underscorejs.org/#isNaN)
* [isNull](http://underscorejs.org/#isNull)
* [isNumber](http://underscorejs.org/#isNumber)
* [isObject](http://underscorejs.org/#isObject)
* [isRegExp](http://underscorejs.org/#isRegExp)
* [isString](http://underscorejs.org/#isString)
* [isUndefined](http://underscorejs.org/#isUndefined)

## Custom validators <a name="custom_validators"></a>

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

### Plug validators from other libraries in

```javascript
ValidationBuilder.register('isNumber', _.isNumber);

var
	v = ValidationBuilder
		.forge()
		.isNumber()
		.build();

console.log(v.run(10).forAll()); // true
```
