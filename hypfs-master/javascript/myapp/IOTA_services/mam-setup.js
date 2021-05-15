const Mam = require('@iota/mam')
const fs = require('fs')
const iotaAreaCodes = require('@iota/area-codes');

function mam_setup() {
    const mode = 'restricted'
    const secretKey = 'VERYSECRETKEY'
    const provider = 'https://nodes.devnet.iota.org'
    const seed = 'YHALL9LMBDBEYVBDLMBVITNEVFTFR9MGHSKERGYOEPWS9OZHQVNXGUX9VUNJWIDDUZJB9GAVQHZUMLUDB' //TODO: DA METTERE

    const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${secretKey.padEnd(81, '9')}&root=`

    // Initialise MAM State
    let mamState = Mam.init(provider)

    // Set channel mode
    mamState = Mam.changeMode(mamState, mode, secretKey)
    //console.log('Initial state: ', mamState)

    //Store MAM state in case system breaks down
    fs.writeFileSync('mam_state.json', JSON.stringify(mamState))

    //Make sure to use the correct root/channelID for the fetch
    return [ mode, secretKey, provider ]

}

module.exports = mam_setup

mam_setup()
