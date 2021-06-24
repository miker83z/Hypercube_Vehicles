const jwt_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMkQzS29vV050M2JIc0c5UDNUVFNMUzRBcmM3amFNWEV4YjZKZ2h6QWNZWm12Q0htdndQIiwianRpIjoiMTYyMjUzNzI0NSIsImlhdCI6MTYyMjUzNzI0NSwiaXNzIjoiMTJEM0tvb1dOdDNiSHNHOVAzVFRTTFM0QXJjN2phTVhFeGI2SmdoekFjWVptdkNIbXZ3UCIsIm5iZiI6MTYyMjUzNzI0NSwic3ViIjoiSE9STkVUIiwiZGFzaGJvYXJkIjpmYWxzZSwiYXBpIjp0cnVlfQ.klH2srjR-zOak4pH5b9TqC1jGkEeLg_neQiVYOGGxks"

async function retrieve_message(message_id) {
    const { ClientBuilder } = require('@iota/client');

    // client will connect to testnet by default
    const client = new ClientBuilder()
    .primaryNode('https://iota.mywaver.it:443', { jwt: jwt_key })
    .localPow(false)
    .build();

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

function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

module.exports = { retrieve_message }
