var util = require('util');
var events = require('events');
var dgram = require('dgram');

// ArtNet server class
exports.listen = function(hostname, port, cb) {
	this.hostname = hostname;
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
				
		cb(data, peer);
	});
	sock.bind(port, hostname);
}

// Setup EventEmitter for the ArtNetServer
util.inherits(this, events.EventEmitter);

