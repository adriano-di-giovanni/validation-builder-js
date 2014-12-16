(function (root, factory) {

  function ValidationBuilder() {
    this.initialize();
  }

  if (typeof define === 'function' && define.amd) {
    define([ 'underscore' ], function (_) {
      return (root.ValidationBuilder = factory(ValidationBuilder, _));
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(ValidationBuilder, require('underscore'));
  } else {
    root.ValidationBuilder = factory(ValidationBuilder, root._);
  }
}(this, function (ValidationBuilder, _) {

  ValidationBuilder.VERSION = '<%= pkg.version %>';

