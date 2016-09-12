var Required = require('./lib/required');
var Type = require('./lib/type');
var Enum = require('./lib/enum');
var Value = require('./lib/value');
var CustomValidator = require('./lib/validator');

module.exports = function (scheme) {
    return new Scheme(scheme);
};

function Scheme(scheme, options) {
    this.scheme = scheme;
    this.options = options;
}

Scheme.prototype.validate = function (data) {
    for (var key in this.scheme) {
        if (!this.scheme.hasOwnProperty(key)) continue;
        var field = this.scheme[key];

        var error = check(field, data, key);
        if (error) return error;
    }

    return { success : true };
};

function check(field, data, key) {
    if (!field) return;

    if (!Required(field, data, key)) return error(key, 'Field is required!');
    if (field.structure) {
        if (field.structure && field.hasOwnProperty('type') && field.type.toLowerCase() !== "object") return error(key, 'Wrong type for field with structure!');
        if (field.structure && typeof field.structure !== "object") return error(key, 'Wrong data for structure!');

        var scheme = new Scheme(field.structure);
        if (data[key]) {
            var result = scheme.validate(data[key]);
            if (!result.success) return error(key + '.' + result.error.key, result.error.text);
        }
    }

    if (field.array && data[key]) {
        var result = null;

        for (var i = 0, max = data[key].length; i < max; i++) {
            result = check(field.array, { el : data[key][i] }, 'el');
            if (result && !result.success) break;
        }

        if (result && !result.success) return error(key + '.' + i, result.error.text);
    }

    if (!Type(field, data, key)) return error(key, 'Wrong type of field!');

    if (field.enum && field.enum.constructor && field.enum.constructor !== Array) return error(key, 'Wrong data for enum!');
    if (!Enum(field, data, key)) return error(key, 'Value is not part of enum!');

    if (!Value(field, data, key)) return error(key, 'Value is not equal!');

    if (field.validator && typeof field.validator !== "function") return error(key, 'Wrong data for validator!');
    if (!CustomValidator(field, data, key)) return error(key, 'Validator detected wrong data!');
}

function error(key, text) {
    return {
        success : false,
        error : {
            key  : key,
            text : text
        }
    }
}