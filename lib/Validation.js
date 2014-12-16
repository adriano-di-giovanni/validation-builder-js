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
