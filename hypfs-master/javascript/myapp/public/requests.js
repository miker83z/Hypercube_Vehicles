const iotaAreaCodes = require('@iota/area-codes');



function client_request(url, data, operation) {

    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: data,
        success: function (data) {
            output_data(operation, data)

        },
        error: function (err) {
            console.log("errore", err)
        }
    });

}

global.choose_operation = function (operation) {
    var url;
    var data;

    switch (operation) {
        case "insert":

            url = '/insert'
            //data = JSON.stringify({ 'keyword': 3, "obj": point })

            break;
        case "pin_search":

            url = '/pin_search'
            data = JSON.stringify({ 'keyword': 2, "threshold": -1 })

            break;
        case "superset_search":

            url = '/superset_search'
            data = JSON.stringify({ 'keyword': 4, "threshold": 5 })
            break;

        case "remove":

            url = '/remove'
            data = JSON.stringify({ 'keyword': 2, "obj": "DOWOEGCRBXJAN9GTLDHRSDED9BODDMOTMIAOUHER9FSXPKHCMUEURAFWIHAACWRBMWOBMJWCUMAHYEFMU" })
            break;

    }
    client_request(url, data, operation)

}


global.output_data = function (operation, data) {
    console.log(data)
    var count = 0

    switch (operation) {
        case "pin_search":
        case "superset_search":
            for (element of data[0]) {

                coord = decodeIAC(element.message)
                L.marker([coord.latitude, coord.longitude]).addTo(layerGroup);
                //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
            }

            break;

        case "clear":
            // remove all the markers in one go
            layerGroup.clearLayers();
            break;
        default:
            break;

    }
}

function decodeIAC(IAC_point) {


    if (iotaAreaCodes.isValid(IAC_point)) {
        const codeArea = iotaAreaCodes.decode(IAC_point);
        return codeArea
    }

}
