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
