module.exports = function (field, data, key) {
    if (field.validator && data.hasOwnProperty(key) && !field.validator(data[key])) return false;

    return true;
}