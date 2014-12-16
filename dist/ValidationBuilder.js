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

  ValidationBuilder.VERSION = '0.0.2';

var
  Invokable = (function (_) {

    function Invokable(name, fn, args) {
      this._name = name;
      this._fn = fn;
      this._args = _.toArray(args);
    }

    _.extend(Invokable.prototype, {
      getName: function () {
        return this._name;
      },
      invoke: function (subject) {

        var
          args = [ subject ].concat(this._args);

        return this._fn.apply(null, args);
      }
    });

    return Invokable;
  }(_));

var
  Result = (function (_) {

    function Result(invokables, results) {
      this._invokables = invokables;
      this._results = results;
    }

    _.extend(Result.prototype, {
      forAll: function () {
        var
          results = this._results;

        return _(results).reduce(function (memo, result) {
          return memo && result;
        }, true);
      },
      forAny: function () {
        var
          results = this._results;

        return _(results).reduce(function (memo, result) {
          return memo || result;
        }, false);
      },
      forOne: function (name) {
        var
          invokables = this._invokables,
          results = this._results;

        return _(results).find(function (element, index) {
          return invokables[index].getName() === name;
        });
      }
    });

    return Result;
  }(_));

var
  Validation = (function (_, Result) {

    function Validation(invokables) {
      this._invokables = invokables;
    }

    Validation.prototype.run = function (subject) {

      var
        invokables = this._invokables,
        results = _(invokables).map(function (invokable) {
          return invokable.invoke(subject);
        });

      return new Result(invokables, results);
    };

    return Validation;

  }(_, Result));

(function (_, ValidationBuilder, Invokable, Validation) {

  _.extend(ValidationBuilder, {
    register: function (name, fn) {

      ValidationBuilder.prototype[name] = function () {
        this._invokables.push(new Invokable(name, fn, arguments));
        return this;
      };

      return this;
    },
    unregister: function (name) {
      delete ValidationBuilder.prototype[name];
      return this;
    },
    forge: function () {
      return new this();
    }
  });

  _.extend(ValidationBuilder.prototype, {
    initialize: function () {
      this._invokables = [];
    },
    build: function () {
      var
        invokables = this._invokables;

      return new Validation(invokables);
    }
  });

}(_, ValidationBuilder, Invokable, Validation));

(function (_, ValidationBuilder) {
  ValidationBuilder.register('containsAll', function (subjectArray, compareArray) {
    return _(compareArray).reduce(function (memo, element) {
      return memo && _(subjectArray).contains(element);
    }, true);
  });
}(_, ValidationBuilder));

(function (_, ValidationBuilder) {
  ValidationBuilder.register('containsAny', function (subjectArray, compareArray) {
    return _(compareArray).reduce(function (memo, element) {
      return memo || _(subjectArray).contains(element);
    }, false);
  });
}(_, ValidationBuilder));

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

  return ValidationBuilder;
}));
