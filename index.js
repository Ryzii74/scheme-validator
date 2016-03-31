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

        if (field.structure) {
            if (field.structure && field.hasOwnProperty('type') && field.type.toLowerCase() !== "object") return error(key, 'Wrong type for field with structure!');
            if (field.structure && typeof field.structure !== "object") return error(key, 'Wrong data for structure!');

            var scheme = new Scheme(field.structure);
            var result = scheme.validate(data[key]);
            if (!result.success) return error(key + '.' + result.error.key, result.error.text);
        }

        if (!require('./lib/required')(field, data, key)) return error(key, 'Field is required!');
        if (!require('./lib/type')(field, data, key)) return error(key, 'Wrong type of field!');

        if (field.enum && field.enum.constructor && field.enum.constructor !== Array) return error(key, 'Wrong data for enum!');
        if (!require('./lib/enum')(field, data, key)) return error(key, 'Value is not part of enum!');

        if (!require('./lib/value')(field, data, key)) return error(key, 'Value is not equal!');

        if (field.validator && typeof field.validator !== "function") return error(key, 'Wrong data for validator!');
        if (!require('./lib/validator')(field, data, key)) return error(key, 'Validator detected wrong data!');

    }

    return { success : true };
};

function error(key, text) {
    return {
        success : false,
        error : {
            key  : key,
            text : text
        }
    }
}