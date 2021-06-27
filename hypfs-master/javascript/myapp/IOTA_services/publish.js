const { ClientBuilder } = require('@iota/client');
const fs = require('fs');

const path = "C:/Users/Amministratore/Desktop/IOTA_DHT//hypfs-master/javascript/myapp/public/test_files/insert_iota_latency.csv"
const jwt_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMkQzS29vV050M2JIc0c5UDNUVFNMUzRBcmM3amFNWEV4YjZKZ2h6QWNZWm12Q0htdndQIiwianRpIjoiMTYyMjUzNzI0NSIsImlhdCI6MTYyMjUzNzI0NSwiaXNzIjoiMTJEM0tvb1dOdDNiSHNHOVAzVFRTTFM0QXJjN2phTVhFeGI2SmdoekFjWVptdkNIbXZ3UCIsIm5iZiI6MTYyMjUzNzI0NSwic3ViIjoiSE9STkVUIiwiZGFzaGJvYXJkIjpmYWxzZSwiYXBpIjp0cnVlfQ.klH2srjR-zOak4pH5b9TqC1jGkEeLg_neQiVYOGGxks"

fs.writeFile(path, '', function(){console.log('File clean')}) //clean csv file

function run() {

    /*
    const client = new ClientBuilder()
        //.node('https://iota.mywaver.it:443', {'jwt': jwt_string} )
        .node('https://api.lb-0.testnet.chrysalis2.com')
        .localPow(false)
        .build();
    */


    const client = new ClientBuilder()
        .primaryNode('https://iota.mywaver.it:443', { jwt: jwt_key })
        .localPow(false) //Pow  done in remote
        .build();


    //client.getInfo().then(console.log).catch(console.error)
    return client

}

var times = []
var num_req = 0;

async function publish_msg(point) {
    const client = run()

    var message_id = "";

    //TEST
    var publishIotaStartTime = new Date().getTime();
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

    //TEST
    var publishIotaEndTime = new Date().getTime();
    //console.log("Publish Iota" + ": " + (publishIotaEndTime - publishIotaStartTime) + "ms")

    update_file(publishIotaEndTime - publishIotaStartTime)


    //fs.appendFileSync(path, publishIotaEndTime - publishIotaStartTime + '\n', 'UTF-8')
    //TEST
    return message_id

}


function update_file(time){
    num_req += 1
    times.push(time) 
    fs.writeFile(path, '', function(){console.log('File clean')})
    const sum = times.reduce((a, b) => a + b, 0);
    const avg = (sum / times.length) || 0;
    fs.appendFileSync(path,"Latenza media:" + avg + '\n', 'UTF-8')
   
}

module.exports = { publish_msg }

