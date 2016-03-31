var expect = require('chai').expect;
var validator = require('../index');

describe('Structure', function() {
    it('field with structure and no data => success', function () {
        var scheme = validator({
            test : {
                structure : {
                    test : {
                        required : true,
                        value : 123
                    }
                }
            }
        });

        var result = scheme.validate({});
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });

    it('field with structure but bad value for structure => error', function () {
        var scheme = validator({
            test : {
                structure : "123"
            }
        });

        var result = scheme.validate({ test : "meow" });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test");
        expect(result.error.text).to.equal("Wrong data for structure!");
    });

    it('field with structure and wrong type => error', function () {
        var scheme = validator({
            test : {
                type : "number",
                structure : {
                    test : {
                        required : true,
                        value : 123
                    }
                }
            }
        });

        var result = scheme.validate({ test : "meow" });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test");
        expect(result.error.text).to.equal('Wrong type for field with structure!');
    });

    it('field with structure and wrong value => error', function () {
        var scheme = validator({
            test : {
                structure : {
                    test : {
                        required : true,
                        value : 123
                    }
                }
            }
        });

        var result = scheme.validate({ test : "meow" });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(false);
        expect(result.error).to.be.a("object");
        expect(result.error.key).to.equal("test.test");
        expect(result.error.text).to.equal('Field is required!');
    });

    it('field with structure and right value => success', function () {
        var scheme = validator({
            test : {
                structure : {
                    test : {
                        required : true,
                        value : 123
                    }
                }
            }
        });

        var result = scheme.validate({ test : { test : 123 } });
        expect(result).to.be.a("object");
        expect(result.success).to.equal(true);
    });
});