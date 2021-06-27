var config = {};

config.dht = {};
config.web = {};
config.location = {}
config.iota = {}

config.web.port = process.env.PORT || 3000;
config.dht.HIPERCUBE_SIZE = 3;
config.location.METERS = 100000

config.iota.KEY_JWT  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMkQzS29vV050M2JIc0c5UDNUVFNMUzRBcmM3amFNWEV4YjZKZ2h6QWNZWm12Q0htdndQIiwianRpIjoiMTYyMjUzNzI0NSIsImlhdCI6MTYyMjUzNzI0NSwiaXNzIjoiMTJEM0tvb1dOdDNiSHNHOVAzVFRTTFM0QXJjN2phTVhFeGI2SmdoekFjWVptdkNIbXZ3UCIsIm5iZiI6MTYyMjUzNzI0NSwic3ViIjoiSE9STkVUIiwiZGFzaGJvYXJkIjpmYWxzZSwiYXBpIjp0cnVlfQ.klH2srjR-zOak4pH5b9TqC1jGkEeLg_neQiVYOGGxks'
config.iota.URL_NODE = 'https://iota.mywaver.it:443'

module.exports = config;


