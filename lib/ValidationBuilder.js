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
