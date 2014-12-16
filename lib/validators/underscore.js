(function (_, ValidationBuilder) {

  var
    validators = [
      'isArguments',
      'isArray',
      'isBoolean',
      'isDate',
      'isElement',
      'isEmpty',
      'isEqual',
      'isFinite',
      'isFunction',
      'isNaN',
      'isNull',
      'isNumber',
      'isObject',
      'isRegExp',
      'isString',
      'isUndefined'
    ];

  _(validators).each(function (validator) {
    ValidationBuilder.register(validator, _[validator]);
  });
}(_, ValidationBuilder));
