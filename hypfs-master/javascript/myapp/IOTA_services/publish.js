const { ClientBuilder } = require('@iota/client');
const config = require('../config')

function run() {

    //PRIVATE NODE

    /*
    const client = new ClientBuilder()
        //.node('https://iota.mywaver.it:443', {'jwt': jwt_string} )
        .node('https://api.lb-0.testnet.chrysalis2.com')
        .localPow(config.iota.LOCAL_POW)
        .build();
    */

    //MAINNET

    const client = new ClientBuilder()
        //.node('https://iota.mywaver.it:443', {'jwt': jwt_string} )
        .node(config.iota.URL_NODE_MAINNET)
        .localPow(config.iota.LOCAL_POW)
        .build();

    //TESTNET

    /* 
    const client = new ClientBuilder()
        .primaryNode(config.iota.URL_NODE, { jwt: config.iota.KEY_JWT })
        .localPow(config.iota.LOCAL_POW) //if false Pow  done in remote
        .build();

    */
    //client.getInfo().then(console.log).catch(console.error)
    return client

}


async function publish_msg(point) {

    const client = run()
    var message_id = "";

    //TEST
    publishIotaStartTime = new Date().getTime();
    //TEST

    try {
        const message = await client.message()
            .index('IOTA.RS BINDING - NODE.JS')
            .data(point)
            .submit();

        message_id = message.messageId
    } catch (err) {
        console.log(err);
    }

    return message_id

}


module.exports = { publish_msg }

