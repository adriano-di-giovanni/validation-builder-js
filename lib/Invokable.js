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
