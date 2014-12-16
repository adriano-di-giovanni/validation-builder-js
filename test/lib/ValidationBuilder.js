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

      expect(v.run(null)).to.deep.equal([ false ]);
      expect(v.run([])).to.deep.equal([ true ]);
    });

    it('#isNull', function () {

      var
        v = vb
          .isNull()
          .build();

        expect(v.run(null)).to.deep.equal([ true ]);
        expect(v.run(0)).to.deep.equal([ false ]);
    });

    it('#isUndefined', function () {

      var
        v = vb
          .isUndefined()
          .build();

        expect(v.run(void 0)).to.deep.equal([ true ]);
        expect(v.run(0)).to.deep.equal([ false ]);
    });

    it('#containsAll', function () {

      var
        v = vb.containsAll([ 'a', 'b', 'c' ]).build();

      expect(v.run([ 'a', 'b' ])).to.deep.equal([ false ]);
      expect(v.run([ 'a', 'b', 'c', 'd' ])).to.deep.equal([ true ]);
    });

    it('#containsAny', function () {

      var
        v = vb.containsAny([ 'a', 'b', 'c' ]).build();

      expect(v.run([ 'x', 'y' ])).to.deep.equal([ false ]);
      expect(v.run([ 'b', 'd' ])).to.deep.equal([ true ]);
    });
  });
};
