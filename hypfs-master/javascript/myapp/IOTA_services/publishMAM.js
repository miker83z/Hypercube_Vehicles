
//Require MAM package from iota.js
const Mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')
const fs = require('fs')
const iotaAreaCodes = require('@iota/area-codes');


//MAM setup
const mode = 'restricted'
const secretKey = 'VERYSECRETKEY'
const provider = 'https://nodes.devnet.iota.org'
const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${secretKey.padEnd(81, '9')}&root=`

//Put your own seed here 
const seed = 'SDRNSFAIGKGCLVHFDRKHPFRETRIXJKUWBIMQWBAKPHLVQMTZBJWCMRZXFLDPOXJDGATIBTFQLJZTXZTBH'

//Initialize MAM state object
mamState = Mam.init(provider, seed)

//Mam.init(provider)

//Recover previous MAM state
//let stored = fs.readFileSync('mam_state.json', 'utf8')
//console.log('Stored: ',stored)

//let mamState = JSON.parse(stored)
console.log('MamState: ', mamState)

//Change MAM state to previous and change mode
Mam.changeMode(mamState, mode, secretKey)  ///////MODALITà RESTRICTED

// Publish to tangle

const publish = async (packet, tag) => {
  
    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state
    //fs.writeFileSync('mam_state.json', JSON.stringify(mamState))

    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9, tag)
  

    //console.log('Published', packet, '\n');
    //console.log('Address', message.address, '\n')

    /*
    if (mamState.channel.start === 1) {
        console.log('\r\nListen to this stream with\n\r\n\r', message.root, '\r\n\r\n')
    } else {
        console.log('\r\nUpdated root: ', message.root, '\r\n')
    }
    */

    return message.root
}


execute = async (tag) => {
    const root = await publish({
        message: tag,
        timestamp: (new Date()).toLocaleString()
    }, tag);


    console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`)
    return root
}




const start = async function () {


    const iac = iotaAreaCodes.encode(31.895379, 60.363030);
    const iac2 = iotaAreaCodes.encode(44.503016, 11.303739, iotaAreaCodes.CodePrecision.EXTRA);
    const iac3 = iotaAreaCodes.encode(44.486871, 11.288720, iotaAreaCodes.CodePrecision.EXTRA)
    console.log("iac", iac, iac2, iac3)
    tag = 'MKNSJWGM9QP'


    await execute(tag)
    /*
    var i = 1
    const iacUP = iotaAreaCodes.encode(11.895379 + i, 30.363030);

    const interval = 30 //every x sec
    //Set interval to get GPS data

    setInterval(function () { publishAll(iacUP); },interval*1000)
    //i++ //PER AGGIORNARE AUTOMATICAMENTE LE COORDINATE
    */
}
//start()

//execute('MKNSJWGM9QP')
module.exports = {
    execute: execute
};

