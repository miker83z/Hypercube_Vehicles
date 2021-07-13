// Require the IOTA libraries
const Iota = require('@iota/core');
const Mam = require('@iota/mam')
const { trytesToAscii } = require('@iota/converter');
const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'

mamState = Mam.init(provider)
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

