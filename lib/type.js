module.exports = function (field, data, key) {
    if (!data.hasOwnProperty(key)) return true;

    if (field.array) {
        return data[key].constructor && data[key].constructor === Array;
    }

    if (field.type) {
        field.type = field.type.toLowerCase();

        if (typeof data[key] !== field.type) return false;
    }

    return true;
};