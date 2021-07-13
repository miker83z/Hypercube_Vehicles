var express = require('express');
var router = express.Router();
const request = require('request');
const myModuleRequire = require('../IOTA_services/retrieve.js');
const utils = require('../utils.js')
const config = require('../config.js')

const file_path_mainnet = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/retrieve_IOTA/retrieve_mainnet_"+ config.iota.MODE +"_pow_"+config.iota.LOCAL_POW+"_node_iota.csv"
const filepath = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/retrieve_IOTA/retrieve_"+config.iota.MODE +"_pow_"+config.iota.LOCAL_POW+"_node_iota.csv"


const filepath_DHT = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/superset_DHT/superset_"+config.dht.HIPERCUBE_SIZE + ".csv"
const NODES = 2 ** config.dht.HIPERCUBE_SIZE
var fetchIotaStartTime = 0
var fetchIotaEndTime = 0
var hops_counter = []

router.post('/superset_search_iota', async function (req, res) {

    

    point = utils.OPC_conversion_manual(req.body.point)
    threshold = req.body.threshold
    const encoded_point = utils.binToStr(utils.encode(point))
    console.log("POINT:", point, "-->", "ENCODED POINT:", encoded_point)

    supersetStartTime = new Date().getTime()

    make_req(encoded_point, threshold, async function (data) {
      

        supersetEndTime = new Date().getTime()
        //utils.write_csv(supersetStartTime, supersetEndTime, filepath_DHT)


        if (data != undefined) {

            message_id_list = utils.split_str(data)
            //console.log("messsage_id  DHT", message_id_list, "point:", req.body.point)

            var resultFetch = []
            //get data from MAM
            //console.log('Fetch data from the tangle. Please be patient...')

            fetchIotaStartTime = new Date().getTime();

            for (const message_id of message_id_list) {
               
                await myModuleRequire.retrieve_message(message_id).then(function (res) {
                    resultFetch.push(res)
                })
            }


            fetchIotaEndTime = new Date().getTime();
      
            utils.write_csv(fetchIotaStartTime, fetchIotaEndTime, file_path_mainnet)
      

            console.log('FETCH IOTA DONE.')
            res.send({ 'data': resultFetch, "point": req.body.point })


        } else {
            console.log("No result found")
            res.send(false)
        }

    })


});



const make_req = async function (keyword, threshold, callback) {

    reset_hops()
    const server = Math.floor(Math.random() * (NODES)) + 50000;
    //console.log("server contattato", server)

    const options = {
        url: 'http://127.0.0.1:' + server + '/superset_search',
        method: 'GET',
        qs: { 'keyword': keyword, "threshold": threshold, 'sender': 'user' },
        json: true
    };

    

    request(options, function optionalCallback(err, httpResponse, body) {
    
        get_hops()
        
        

        console.log("REQUEST SUPERSET SEARCH DHT DONE.")
        if (err) {
            console.error('Upload failed:', err);
        } else {

            if (body == "") {
                callback("")
            } else {
                callback(body)
            }
        }

       

    })

   
}



function get_hops() {
    request('http://127.0.0.1:60000/get_hops', function (error, response, body) {
        //console.error('error:', error); // Print the error
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body GET:', body); // Print the data received
        hops_counter.push(body)
        //res.send(body); //Display the response on the website
    });
}

function reset_hops() {
    console.log("reset")
    request('http://127.0.0.1:60000/reset_hops', function (error, response, body) {
        //console.error('error:', error); // Print the error
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body RESET:', body); // Print the data received
        //res.send(body); //Display the response on the website
    });
}



module.exports = router;