const { ClientBuilder } = require('@iota/client');
const config = require('../config')
const write = require('./write.js')

var num_req = 0;


async function retrieve_message(message_id) {

    // client will connect to testnet by default
    const client = new ClientBuilder()
        .primaryNode(config.iota.URL_NODE, { jwt: config.iota.KEY_JWT })
        .localPow(false)
        .build();

    //client.getInfo().then(console.log).catch(console.error)
    var decodedMsg;
    //TEST
    var fetchIotaStartTime = new Date().getTime();
    //TEST

    await client.getMessage().data(message_id).then(data => {

        decodedMsg = hex_to_ascii(data.message.payload.data)


        //const message_data = await client.getMessage().data(message_id)
        //console.log(message_data.message.payload.data);


    }).catch(err => {
        console.log(err)
    })

    //TEST
    var fetchIotaEndTime = new Date().getTime();
    //console.log("Publish Iota" + ": " + (publishIotaEndTime - publishIotaStartTime) + "ms")
    num_req += 1
    write.writeFile(num_req, fetchIotaEndTime - fetchIotaStartTime, "retrieve_test_iota")
    //TEST

    return decodedMsg


}

function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

module.exports = { retrieve_message }
