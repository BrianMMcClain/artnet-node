var dgram = require('dgram');
var Buffer = require('buffer').Buffer;

function ArtNetClient(host, port) {
	this._host = host;
	this._port = port;
	this.HEADER = [65, 114, 116, 45, 78, 101, 116, 0, 0, 80, 0, 14];
	this.SEQUENCE = [0];
	this.PHYSICAL = [0];
	this.UNIVERSE = [0, 0];
	this.LENGTH = [0, 13];
}
exports.ArtNetClient = ArtNetClient;

exports.createClient = function(host, port) {
	return new ArtNetClient(host, port);
}

ArtNetClient.prototype.send = function(data) {
	var data = this.HEADER.concat(this.SEQUENCE).concat(this.PHYSICAL).concat(this.UNIVERSE).concat(this.LENGTH).concat(data);
	var buf = Buffer(data);
	
	var sock = dgram.createSocket("udp4");
	sock.send(buf, 0, buf.length, this._port, this._host, function() {
		sock.close();
	});
}