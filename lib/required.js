module.exports = function (field, data, key) {
    if (field.required && data && !data.hasOwnProperty(key)) return false;

    return true;
}