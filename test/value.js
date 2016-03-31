var expect = require('chai').expect;
var validator = require('../index');

describe('Value', function() {
    it('field with value and no data => success', function () {
        var scheme = validator({
            test : {
                value : 123
            }
        });

        var result = scheme.validate({});
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });

    it('field with value and wrong data => error', function () {
        var scheme = validator({
            test : {
                value : 123
            }
        });

        var result = scheme.validate({ test : "meow" });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test");
        expect(result.error.text).to.equal("Value is not equal!");
    });

    it('field with value and right value => success', function () {
        var scheme = validator({
            test : {
                value : 123
            }
        });

        var result = scheme.validate({ test : 123 });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });
});