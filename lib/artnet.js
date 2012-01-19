var util = require('util');
var events = require('events');

// ArtNet server class
var ArtNetServer = function()
{
	events.EventEmitter.call(this);
}

// ArtNet client class
var ArtNet = function()
{

}

// Setup EventEmitter for the ArtNetServer
util.inherits(ArtNetServer, events.EventEmitter);

exports.ArtNetServer = ArtNetServer;