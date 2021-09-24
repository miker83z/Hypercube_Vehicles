//Require MAM package from iota.js
const Mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')

//MAM setup
const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
//const provider = 'https://thetangle.org/'
const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`

// Publish to tangle
const publish = async (packet) => {
    
    mamState = Mam.init(provider)

    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state
    console.log(message.state)
    // Attach the payload

    await Mam.attach(message.payload,  message.address, 3, 14) //9 for devnet

    //console.log('Published', packet, '\n');
    //console.log('Address', message.address, '\n')
    
    return message.root
}


execute = async (code) => {

    const root = await publish({
        message: code,
        timestamp: (new Date()).toLocaleString()
    });

    console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`)
    return root
}


module.exports = {
    execute: execute
};



