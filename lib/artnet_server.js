var util = require('util');
var events = require('events');
var dgram = require('dgram');

// ArtNet server class
exports.listen = function(port, cb) {
	this.port = port;
	events.EventEmitter.call(this);
	
	// Set up the socket
	var sock = dgram.createSocket("udp4", function (msg, peer) {
		var data = new Array();
		for (i = 0; i < msg.length; i++) {
			var d = msg.toString().charCodeAt(i);
			// Since we can't do unsigned 8-bit integers, do some normalization
			if (d < 0) {
				d = 0;
			} else if (d > 255) {
				d = 255;
			}
			
			// Append the byte to the array
			data.push(d);
		}
		
		// Deseralize the data - magic numbers are as per the Art-Net protocol
		var sequence = data[12];
		var physical = data[13];
		var universe = (data[14] * 256) + data[15];
		var length = (data[16] * 256) + data[17];
		
		var rawData = new Array();
		for (i = 0; i < length; i++) {
			rawData.push(data[i + 18]);
		}
			
		// Build the associative array to return
		var retData = {sequence: sequence, physical: physical, universe: universe, length: length, data: rawData};
		
		// And call the callback passing the deseralized data
		cb(retData, peer);
	});
	sock.bind(port);
}

// Setup EventEmitter for the ArtNetServer
util.inherits(this, events.EventEmitter);

