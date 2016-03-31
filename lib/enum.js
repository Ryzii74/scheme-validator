module.exports = function (field, data, key) {
    if (field.enum && data.hasOwnProperty(key) && field.enum.indexOf(data[key]) === -1) return false;

    return true;
}