(function (_, ValidationBuilder) {
  ValidationBuilder.register('containsAny', function (targetArray, compareArray) {
    return _(compareArray).reduce(function (memo, element) {
      return memo || _(targetArray).contains(element);
    }, false);
  });
}(_, ValidationBuilder));
