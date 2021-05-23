
//Require MAM package from iota.js
const Mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')

//MAM setup
const mode = 'public'
//const secretKey = 'VERYSECRETKEY'
const provider = 'https://nodes.devnet.iota.org'
const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`
//Put your own seed here 
//const seed = '99YOCAMVNDE9HMJUZBLRGYBHGBOQKNYVUJYPOZIOKBIZBQRKLIPKBLXKIJMFJGSQSGXHABXGSKMQUCGVU'

//Initialize MAM state object
//mamState = Mam.init(provider, seed)

mamState = Mam.init(provider)


//Change MAM state to previous and change mode
//Mam.changeMode(mamState, mode, secretKey)  ///////MODALITà RESTRICTED

// Publish to tangle

const publish = async (packet) => {

    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state
    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9)

    console.log('Published', packet, '\n');
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

