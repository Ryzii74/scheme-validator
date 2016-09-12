module.exports = function (field, data, key) {
    if (field.value && data && data.hasOwnProperty(key) && field.value !== data[key]) return false;

    return true;
};