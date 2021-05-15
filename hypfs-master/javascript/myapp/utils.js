function split_str(string) {

    var str_splitted = new Array();
    str_splitted = string.split(",");

    return str_splitted
}

module.exports = { split_str };