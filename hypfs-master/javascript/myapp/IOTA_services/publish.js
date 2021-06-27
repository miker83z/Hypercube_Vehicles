const { ClientBuilder } = require('@iota/client');
const write = require('./write.js')
const config = require('../config')

const path = "C:/Users/Amministratore/Desktop/IOTA_DHT//hypfs-master/javascript/myapp/public/test_files/insert_iota_latency.csv"


function run() {

    /*
    const client = new ClientBuilder()
        //.node('https://iota.mywaver.it:443', {'jwt': jwt_string} )
        .node('https://api.lb-0.testnet.chrysalis2.com')
        .localPow(false)
        .build();
    */


    const client = new ClientBuilder()
        .primaryNode(config.iota.URL_NODE, { jwt: config.iota.KEY_JWT })
        .localPow(false) //Pow  done in remote
        .build();


    //client.getInfo().then(console.log).catch(console.error)
    return client

}


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
    num_req += 1
    write.writeFile(num_req, publishIotaEndTime - publishIotaStartTime, "insert_test_iota")
    //TEST
    return message_id

}

/*
function update_file(time){
   
    times.push(time) 
    fs.writeFile(path, '', function(){console.log('File clean')})
    const sum = times.reduce((a, b) => a + b, 0);
    const avg = (sum / times.length) || 0;
    fs.appendFileSync(path,"Latenza media:" + avg + '\n', 'UTF-8')
   
}
*/
module.exports = { publish_msg }

