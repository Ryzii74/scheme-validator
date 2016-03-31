var expect = require('chai').expect;
var validator = require('../index');

describe('Enum', function() {
    it('field with enum and no data => success', function () {
        var scheme = validator({
            test : {
                enum : [1, 2, 3, 4]
            }
        });

        var result = scheme.validate({});
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });

    it('field with enum but bad value for enum => error', function () {
        var scheme = validator({
            test : {
                enum : "123"
            }
        });

        var result = scheme.validate({ test : "meow" });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test");
        expect(result.error.text).to.equal("Wrong data for enum!");
    });

    it('field with enum and wrong value => error', function () {
        var scheme = validator({
            test : {
                enum : [1, 2, 3, 4]
            }
        });

        var result = scheme.validate({ test : "meow" });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test");
        expect(result.error.text).to.equal('Value is not part of enum!');
    });

    it('field with enum and right value => success', function () {
        var scheme = validator({
            test : {
                enum : [1, 2, 3, 4]
            }
        });

        var result = scheme.validate({ test : 3 });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });
});