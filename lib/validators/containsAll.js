(function (_, ValidationBuilder) {
  ValidationBuilder.register('containsAll', function (targetArray, compareArray) {
    return _(compareArray).reduce(function (memo, element) {
      return memo && _(targetArray).contains(element);
    }, true);
  });
}(_, ValidationBuilder));
