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

  ValidationBuilder.VERSION = '0.1.0';

var
  Invokable = (function (_) {

    function Invokable(fn, args) {
      this._fn = fn;
      this._args = _.toArray(args);
    }

    Invokable.prototype.invoke = function (subject) {

      var
        args = [ subject ].concat(this._args);

      return this._fn.apply(null, args);
    };

    return Invokable;
  }(_));

var
  Validation = (function (_) {

    function Validation(invokables) {
      this._invokables = invokables;
    }

    Validation.prototype.run = function (subject) {

      var
        invokables = this._invokables,
        results = _(invokables).map(function (invokable) {
          return invokable.invoke(subject);
        });

      return results;
    };

    return Validation;

  }(_));

(function (_, ValidationBuilder, Invokable, Validation) {

  _.extend(ValidationBuilder, {
    register: function (name, fn) {

      ValidationBuilder.prototype[name] = function () {
        this._invokables.push(new Invokable(fn, arguments));
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
  ValidationBuilder.register('containsAll', function (targetArray, compareArray) {
    return _(compareArray).reduce(function (memo, element) {
      return memo && _(targetArray).contains(element);
    }, true);
  });
}(_, ValidationBuilder));

(function (_, ValidationBuilder) {
  ValidationBuilder.register('containsAny', function (targetArray, compareArray) {
    return _(compareArray).reduce(function (memo, element) {
      return memo || _(targetArray).contains(element);
    }, false);
  });
}(_, ValidationBuilder));

(function (_, ValidationBuilder) {
  ValidationBuilder.register('isArray', _.isArray);
}(_, ValidationBuilder));

(function (_, ValidationBuilder) {
  ValidationBuilder.register('isNull', _.isNull);
}(_, ValidationBuilder));

(function (_, ValidationBuilder) {
  ValidationBuilder.register('isUndefined', _.isUndefined);
}(_, ValidationBuilder));

  return ValidationBuilder;
}));
