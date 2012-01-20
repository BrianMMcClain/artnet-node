var artnetclient = require('../lib/artnet_client');

var data = [255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];

var client = artnetclient.createClient('127.0.0.1', 6454);
client.send(data);