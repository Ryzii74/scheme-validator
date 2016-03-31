var expect = require('chai').expect;
var validator = require('../index');

describe('Type', function() {
    it('field with type and no data => success', function () {
        var scheme = validator({
            test : {
                type : "string"
            }
        });

        var result = scheme.validate({});
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });

    it('field with type and wrong type => error', function () {
        var scheme = validator({
            test : {
                type : "string"
            }
        });

        var result = scheme.validate({ test : {} });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test");
        expect(result.error.text).to.equal("Wrong type of field!");
    });

    it('field with type array and wrong type => error', function () {
        var scheme = validator({
            test : {
                type : "array"
            }
        });

        var result = scheme.validate({ test : {} });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test");
        expect(result.error.text).to.equal("Wrong type of field!");
    });

    it('field with type and right type => success', function () {
        var scheme = validator({
            test : {
                type : "string"
            }
        });

        var result = scheme.validate({ test : "test" });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });

    it('field with type array and right type => success', function () {
        var scheme = validator({
            test : {
                type : "array"
            }
        });

        var result = scheme.validate({ test : [ {}, {} ] });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });

    it('field type not case sensitive', function () {
        var scheme = validator({
            test : {
                type : "NuMbEr"
            }
        });

        var result = scheme.validate({ test : 12345 });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });
});