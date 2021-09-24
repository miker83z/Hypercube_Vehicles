const { ClientBuilder } = require('@iota/client');
const config = require('../config')


async function retrieve_message(message_id) {

    //PRIVATE NODE
    /*
    
    // client will connect to testnet by default
    const client = new ClientBuilder()
    .primaryNode(config.iota.URL_NODE, { jwt: config.iota.KEY_JWT })
    .build();
    */
    

    //MAINNET
    const client = new ClientBuilder()
        .node(config.iota.URL_NODE_MAINNET)
        .localPow(config.iota.LOCAL_POW)
        .build();

    
    //TESTNET

    /*
     const client = new ClientBuilder()
     .node('https://api.lb-0.testnet.chrysalis2.com')
     .localPow(config.iota.LOCAL_POW)
     .build();
     */
    //client.getInfo().then(console.log).catch(console.error)
    
    var decodedMsg;

    await client.getMessage().data(message_id).then(data => {

        decodedMsg = hex_to_ascii(data.message.payload.data)

        //const message_data = await client.getMessage().data(message_id)
        //console.log(message_data.message.payload.data);


    }).catch(err => {
        console.log(err)
    })


    return decodedMsg


}

// message decoding
function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

module.exports = { retrieve_message }
