var expect = require('chai').expect;
var validator = require('../index');

describe('Validator', function() {
    it('field with validator and no data => success', function () {
        var scheme = validator({
            test : {
                validator : function (value) {
                    return !!value;
                }
            }
        });

        var result = scheme.validate({});
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });

    it('field with validator but bad value for validator => error', function () {
        var scheme = validator({
            test : {
                validator : "123"
            }
        });

        var result = scheme.validate({ test : "meow" });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test");
        expect(result.error.text).to.equal("Wrong data for validator!");
    });

    it('field with validator and wrong value => error', function () {
        var scheme = validator({
            test : {
                validator : function (value) {
                    return !!value;
                }
            }
        });

        var result = scheme.validate({ test : false });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test");
        expect(result.error.text).to.equal('Validator detected wrong data!');
    });

    it('field with validator and right value => success', function () {
        var scheme = validator({
            test : {
                validator : function (value) {
                    return !!value;
                }
            }
        });

        var result = scheme.validate({ test : true });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });
});