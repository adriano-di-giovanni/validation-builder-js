'use strict';

global.expect = require('chai').expect;

var
  lib = require('./lib');

describe('Unit tests', function () {
  lib.ValidationBuilder();
});
