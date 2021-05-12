//SCRIPT PER PUBBLICAZIONE SU IOTA SENZA MAM


const Iota = require('@iota/core');
const iotaAreaCodes = require('@iota/area-codes');
const { asciiToTrytes } = require('@iota/converter')

// Create a new instance of the IOTA API object
// Use the `provider` field to specify which node to connect to
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

const address =
    'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';

const seed = 'MLWQKPMDSEVWFE9MSWJGOGXDLIFQL9EEFENNMJOBJVNTHTWERAHCOACWUBNREJWVLVB9JGTJ9KITBGNEK'

const message = JSON.stringify({ "message": "Hello world" });
const messageInTrytes = asciiToTrytes(message);
var iac = iotaAreaCodes.encode(52.529510, 13.413018, iotaAreaCodes.CodePrecision.EXTRA);


tag2 = 'NPHT'
tag3 = 'NPHTQO'

//Define a transaction that sends the message to the address




tag = 'MUXFRXGY9MT'



if (iotaAreaCodes.isValidPartial(tag) || iotaAreaCodes.isValid(tag)) {
    console.log("Tag valido")
    console.log("TAG:", tag)


    const transfers = [
        {
            value: 0,
            address: address,
            message: messageInTrytes,
            tag: tag,

        }
    ];

    sendTrx(transfers)


} else {

    console.log("IOTA CODE NOT VALID ")
}



function sendTrx(transfers) {
    //Send your transaction to the node
    iota.prepareTransfers(seed, transfers)
        .then(trytes => {
            return iota.sendTrytes(trytes, 3/*depth*/, 9/*MWM*/);
        })
        .then(bundle => {
            console.log(bundle[0].hash)
        })
        .catch(err => {
            console.error(err)
        })
}