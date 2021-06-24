
const jwt_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMkQzS29vV050M2JIc0c5UDNUVFNMUzRBcmM3amFNWEV4YjZKZ2h6QWNZWm12Q0htdndQIiwianRpIjoiMTYyMjUzNzI0NSIsImlhdCI6MTYyMjUzNzI0NSwiaXNzIjoiMTJEM0tvb1dOdDNiSHNHOVAzVFRTTFM0QXJjN2phTVhFeGI2SmdoekFjWVptdkNIbXZ3UCIsIm5iZiI6MTYyMjUzNzI0NSwic3ViIjoiSE9STkVUIiwiZGFzaGJvYXJkIjpmYWxzZSwiYXBpIjp0cnVlfQ.klH2srjR-zOak4pH5b9TqC1jGkEeLg_neQiVYOGGxks"

function run() {

    const { ClientBuilder } = require('@iota/client');

    /*
    const client = new ClientBuilder()
        //.node('https://iota.mywaver.it:443', {'jwt': jwt_string} )
        .node('https://api.lb-0.testnet.chrysalis2.com')
        .localPow(false)
        .build();
    */

    
    const client = new ClientBuilder()
        .primaryNode('https://iota.mywaver.it:443', { jwt: jwt_key })
        .localPow(false)
        .build();
    

    //client.getInfo().then(console.log).catch(console.error)
    return client

}


async function publish_msg(point) {
    const client = run()
    var message_id = "";

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

