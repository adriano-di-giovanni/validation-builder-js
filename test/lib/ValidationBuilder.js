'use strict';

var
  ValidationBuilder = require('../../dist/ValidationBuilder');

module.exports = function () {
  describe('ValidationBuilder', function () {

    var
      vb;

    beforeEach(function () {
      vb = new ValidationBuilder();
    });

    it('should be an instance of ValidationBuilder', function () {
      expect(vb).to.be.an.instanceof(ValidationBuilder);
    });

    it('#isArray', function () {
      var
        v = vb.isArray().build();

      expect(v.run(null).forAll()).to.be.false();
      expect(v.run([]).forAll()).to.be.true();
    });

    it('#isNull', function () {

      var
        v = vb
          .isNull()
          .build();

        expect(v.run(null).forAll()).to.be.true();
        expect(v.run(0).forAll()).to.be.false();
    });

    it('#isUndefined', function () {

      var
        v = vb
          .isUndefined()
          .build();

        expect(v.run(void 0).forAll()).to.be.true();
        expect(v.run(0).forAll()).to.be.false();
    });

    it('#containsAll', function () {

      var
        v = vb.containsAll([ 'a', 'b', 'c' ]).build();

      expect(v.run([ 'a', 'b' ]).forAll()).to.be.false();
      expect(v.run([ 'a', 'b', 'c', 'd' ]).forAll()).to.be.true();
    });

    it('#containsAny', function () {

      var
        v = vb.containsAny([ 'a', 'b', 'c' ]).build();

      expect(v.run([ 'x', 'y' ]).forAll()).to.be.false();
      expect(v.run([ 'b', 'd' ]).forAll()).to.be.true();
    });

    it('#isNull #isUndefined', function () {
      var
        v = vb
          .isNull()
          .isUndefined()
          .build(),

        r = v.run(0);

        expect(r.forAll()).to.be.false();
        expect(r.forAny()).to.be.false();
        expect(r.forOne('isNull')).to.be.false();
        expect(r.forOne('isUndefined')).to.be.false();
    });
  });
};
