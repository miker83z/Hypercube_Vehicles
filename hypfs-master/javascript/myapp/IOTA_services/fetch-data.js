// Require the IOTA libraries
const Iota = require('@iota/core');
const Mam = require('@iota/mam')
const { trytesToAscii } = require('@iota/converter');

const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`


//NB: PER RECUPERARE TUTTI I MSG DEVI SCORRERE I ROOT
fetchData = async (root) => {

    var fetches = []
    //Fetch data from tangle
    await Mam.fetch(root, mode).then(data => {

        for (let i = 0; i < data.messages.length; i++) {
            msg = JSON.parse(trytesToAscii(data.messages[i]))
            fetches.push(msg)
        }

    }).catch(err => {
        console.log(err)
    })

    return fetches
}

module.exports = { fetchData }
//var channelID = 'PGQWQWKOTCIX9OONLSSOTRUGFCJZQMJJGHCBVFUVODAGQOSUGNWTQOWWKGZAABIWEUAD9WWLZVLMEJRQM'
//fetchData(channelID)
//findLocations()