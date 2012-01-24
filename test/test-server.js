var artnetsrv = require('../lib/artnet_server');

var srv = artnetsrv.listen('127.0.0.1', 6454, function(msg, peer) {
	console.log("Received a data packet of length " + msg.length + ": " + msg.data);
});
