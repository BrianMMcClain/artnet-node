var util = require('util');
var events = require('events');

var ArtNetServer = function()
{
	events.EventEmitter.call(this);
}

var ArtNetClient = function()
{
	events.EventEmitter.call(this);
}

util.inherits(ArtNetServer, events.EventEmitter);
util.inherits(ArtNetClient, events.EventEmitter);

exports.ArtNetServer = ArtNetServer;
exports.ArtNetClient = ArtNetClient;