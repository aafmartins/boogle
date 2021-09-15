function checkAppend(string) {
    if (string !== "") {
        string += "+";
    }
    return string
}
module.exports = checkAppend;