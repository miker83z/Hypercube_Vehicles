// Require the IOTA libraries
const Iota = require('@iota/core');
const iotaAreaCodes = require('@iota/area-codes');
const Mam = require('@iota/mam')
const fs = require('fs')
var mam_setup = require('./mam-setup');
const { trytesToAscii } = require('@iota/converter');


// Create a new instance of the IOTA object
// Use the `provider` field to specify which IRI node to connect to
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

/*
//MAM setup 
const provider = 'https://nodes.devnet.iota.org'
const mode = 'restricted'
const secretKey = 'VERYSECRETKEY'


const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${secretKey.padEnd(81, '9')}&root=`

// Initialise MAM State object
let mamState = Mam.init(provider)

//Set channel mode
mamState = Mam.changeMode(mamState, mode, secretKey)
*/

//Make sure to use the correct root/channelID for the fetch
//const channelID = "KXAJLFZHFNRPMM9GOLSARUYZ9RAUPNXICCCJDTK9YXXDUDMADNLYVYXTUIJWMPPBUUKJEYXHNMGSMQTZQ"


//NB: PER RECUPERARE TUTTI I MSG DEVI SCORRERE I ROOT
fetchData = async (root) => {
    console.log("fetchData")

    mode = mam_setup()[0]
    secretKey = mam_setup()[1]
    provider = mam_setup()[2]

    const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${secretKey.padEnd(81, '9')}&root=`

    console.log('Fetch data from the tangle. Please be patient...')

    var fetches = []
    //Fetch data from tangle
    await Mam.fetch(root, mode, secretKey).then(data => {

        for (let i = 0; i < data.messages.length; i++) {
            msg = JSON.parse(trytesToAscii(data.messages[i]))
            fetches.push(msg)
        }

        //console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
        //console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`)
        //data.messages.forEach(message =>  JSON.parse(trytesToAscii(message)))

    }).catch(err => {
        console.log(err)
    })

    return fetches

}



findLocations = async (iac) => {

    console.log('findLocations')
    var locations = [];

    await iota.findTransactions({ tags: [iac] })

        .then(async function func(trytes) {
            await iota.getTransactionObjects(trytes)
                .then(
                    array => {
                        console.log("length msg", array.length);
                        datainfo = trytesToAscii(array[0].signatureMessageFragment.slice(0, -1))
                        console.log(datainfo)


                        for (i = 0; i < array.length; i++) {

                            let areaCode = iotaAreaCodes.extract(array[i].tag);
                            //console.log(area)
                            let data = iotaAreaCodes.decode(areaCode);
                            locations.push({ "lat": data.latitude, "lng": data.longitude });
                            const datainfo = trytesToAscii(array[i].signatureMessageFragment.slice(0, -1))


                        }

                        console.log(`${locations.length} transactions found with the ${iac} tag`)
                        console.log(locations)
                    }
                )
        }
        )
        .catch(err => {
            // Catch any errors
            console.log(err);
        });

    return locations

}



module.exports = { findLocations, fetchData }
//var channelID = 'PGQWQWKOTCIX9OONLSSOTRUGFCJZQMJJGHCBVFUVODAGQOSUGNWTQOWWKGZAABIWEUAD9WWLZVLMEJRQM'
//fetchData(channelID)
//findLocations()