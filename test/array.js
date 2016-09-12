var expect = require('chai').expect;
describe('Array', function() {
    it('field with array and no data => success', function () {
        var scheme = validator({
            test : {
                array : {
                    type : "string"
                }
            }
        });

        var result = scheme.validate({});
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });

    it('field with array and bad validation => error', function () {
        var scheme = validator({
            test : {
                array : {
                    type : "string"
                }
            }
        });

        var result = scheme.validate({ test : [ 123 ] });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test.0");
        expect(result.error.text).to.equal("Wrong type of field!");
    });


    it('all array elements are valid then value => success', function () {
        var scheme = validator({
            test : {
                array : {
                    required : true,
                    enum : [1, 2, 3, 4]
                }
            }
        });

        var result = scheme.validate({ test : [1, 4, 3] });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });
});

var validator = require('../index');
