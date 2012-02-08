var artnetsrv = require('../lib/artnet_server');

var srv = artnetsrv.listen(6454, function(msg, peer) {
	console.log("-----------------");
	console.log("Sequence: " + msg.sequence);
	console.log("Physical: " + msg.physical);
	console.log("Universe: " + msg.universe);
	console.log("Length: " + msg.length);
	console.log("Data: " + msg.data);
	console.log("-----------------");
});
