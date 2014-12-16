(function (_, ValidationBuilder) {
  ValidationBuilder.register('containsAny', function (subjectArray, compareArray) {
    return _(compareArray).reduce(function (memo, element) {
      return memo || _(subjectArray).contains(element);
    }, false);
  });
}(_, ValidationBuilder));
