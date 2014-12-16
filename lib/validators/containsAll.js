(function (_, ValidationBuilder) {
  ValidationBuilder.register('containsAll', function (subjectArray, compareArray) {
    return _(compareArray).reduce(function (memo, element) {
      return memo && _(subjectArray).contains(element);
    }, true);
  });
}(_, ValidationBuilder));
