var expect = require('chai').expect;
var validator = require('../index');

describe('Required', function() {
    it('no field and no data => success', function () {
        var scheme = validator({
            test : {
                value : '123'
            }
        });

        var result = scheme.validate({});
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });

    it('required field and no data => error', function () {
        var scheme = validator({
            test : {
                required : true
            }
        });

        var result = scheme.validate({});
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test");
        expect(result.error.text).to.equal("Field is required!");
    });

    it('required field and no data => error', function () {
        var scheme = validator({
            test : {
                required : true
            }
        });

        var result = scheme.validate({ test : 'test' });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });
});