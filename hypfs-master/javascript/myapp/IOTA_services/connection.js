
const fs = require('fs');
const jwt_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMkQzS29vV050M2JIc0c5UDNUVFNMUzRBcmM3amFNWEV4YjZKZ2h6QWNZWm12Q0htdndQIiwianRpIjoiMTYyMjUzNzI0NSIsImlhdCI6MTYyMjUzNzI0NSwiaXNzIjoiMTJEM0tvb1dOdDNiSHNHOVAzVFRTTFM0QXJjN2phTVhFeGI2SmdoekFjWVptdkNIbXZ3UCIsIm5iZiI6MTYyMjUzNzI0NSwic3ViIjoiSE9STkVUIiwiZGFzaGJvYXJkIjpmYWxzZSwiYXBpIjp0cnVlfQ.klH2srjR-zOak4pH5b9TqC1jGkEeLg_neQiVYOGGxks'

function run() {

   
    const { ClientBuilder } = require('@iota/client');

    var startTime = new Date().getTime();
    

    const client = new ClientBuilder()
        .primaryNode('https://iota.mywaver.it:443', { jwt: jwt_key })
        // .node()
        .localPow(false)
        .build();
        
        var endTime = new Date().getTime();
        var delay = endTime - startTime
        console.log("run" + ": " + (endTime - startTime) + "ms")

        
        const path = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/IOTA_services/out.csv"
        fs.appendFileSync(path, delay + '\n', 'UTF-8')

}

run()