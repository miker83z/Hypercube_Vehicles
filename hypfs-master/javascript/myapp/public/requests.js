
function client_request(url, data) {

    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: data,
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            console.log("errore", err)
        }
    });

}

function choose_operation(operation) {
    var url;
    var data;

    switch (operation) {
        case "insert":

            url = '/insert'
            data = JSON.stringify({ 'keyword': 3, "obj": "51.895890, 61.363030" })

            break;
        case "pin_search":

            url = '/pin_search'
            data = JSON.stringify({ 'keyword': 2, "threshold": -1 })

            break;
        case "superset_search":

            url = '/superset_search'
            data = JSON.stringify({ 'keyword': 3, "threshold": 10 })
            break;

        case "remove":

            url = '/remove'
            data = JSON.stringify({ 'keyword': 3, "obj": "PGQWQWKOTCIX9OONLSSOTRUGFCJZQMJJGHCBVFUVODAGQOSUGNWTQOWWKGZAABIWEUAD9WWLZVLMEJRQM" })
            break;

    }
    client_request(url, data)

}










