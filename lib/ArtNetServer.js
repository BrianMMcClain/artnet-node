var util = require('util');
var events = require('events');
var dgram = require('dgram');

// ArtNet server class
var listen = function(hostname, port) {
	this.hostname = hostname;
	this.port = port;
	events.EventEmitter.call(this);
}

// Setup EventEmitter for the ArtNetServer
util.inherits(this, events.EventEmitter);

exports.listen = listen;