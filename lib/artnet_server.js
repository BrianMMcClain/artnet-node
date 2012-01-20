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
		cb(msg, peer);
	});
	sock.bind(port, hostname);
}

// Setup EventEmitter for the ArtNetServer
util.inherits(this, events.EventEmitter);

