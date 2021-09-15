//THIS FUNCTION CHECKS IF RECEIVED STRING IS EMPTY AND CONCATENATES + IF NOT
function checkAppend(string) {
    if (string !== "") {
        string += "+";
    }
    return string
}
module.exports = checkAppend;