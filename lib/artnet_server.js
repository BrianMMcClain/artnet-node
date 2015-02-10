var util = require('util');
var events = require('events');
var dgram = require('dgram');

// ArtNet server class
exports.listen = function(port, cb) {
	this.port = port;
	events.EventEmitter.call(this);
	
	// Set up the socket
	var sock = dgram.createSocket("udp4", function (msg, peer) {
		
		var sequence = msg.readUInt8(12,true);	
		var physical = msg.readUInt8(13,true);
		var universe = msg.readUInt8(14,true);
		var offset = msg.readUInt8(16,true);
		var length = msg.readUInt8(17,true);
		
		var rawData = [];
	
		for( i = 18; i < 18 + length; i++ ){
			rawData.push( msg.readUInt8(i) );
		}
		
		var retData = {sequence: sequence, physical: physical, universe: universe, length: length, data: rawData};
		
		// And call the callback passing the deseralized data
		cb(retData, peer);
	});
	sock.bind(port);
}

// Setup EventEmitter for the ArtNetServer
util.inherits(this, events.EventEmitter);

