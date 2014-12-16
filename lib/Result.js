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
