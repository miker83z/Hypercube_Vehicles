var config = {};

config.dht = {};
config.web = {};
config.location = {}

config.web.port = process.env.PORT || 3000;
config.dht.HIPERCUBE_SIZE = 6;
config.location.METERS = 100000

module.exports = config;


