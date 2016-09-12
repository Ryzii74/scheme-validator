module.exports = function (field, data, key) {
    if (field.type && data.hasOwnProperty(key)) {
        field.type = field.type.toLowerCase();

        if (field.type === "array") {
            if (data[key].constructor && data[key].constructor !== Array) return false;
        } else {
            if (typeof data[key] !== field.type) return false;
        }
    }

    return true;
};