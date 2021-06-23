// Require the IOTA libraries
const Iota = require('@iota/core');
const Mam = require('@iota/mam')
const { trytesToAscii } = require('@iota/converter');

const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`

mamState = Mam.init(provider) //forse mettere sopra se non cambia nulla
fetchData = async (root) => {

   

    var fetches = []
    //Fetch data from tangle
    await Mam.fetch(root, mode).then(data => {

        for (let i = 0; i < data.messages.length; i++) {

            msg = JSON.parse(trytesToAscii(data.messages[i]))
            fetches.push(msg)

        }


        // console.log(root, "-->", fetches)
    }).catch(err => {
        console.log(err)
    })

    return fetches
}

module.exports = { fetchData }
//var channelID = 'PGQWQWKOTCIX9OONLSSOTRUGFCJZQMJJGHCBVFUVODAGQOSUGNWTQOWWKGZAABIWEUAD9WWLZVLMEJRQM'
//fetchData(channelID)
