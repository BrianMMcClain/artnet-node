'use strict';

const dgram = require('dgram');
const Buffer = require('buffer').Buffer;

class ArtNetClient {

  constructor(host, port) {
  	this._host = host;
  	this._port = port;
  	this._socket = dgram.createSocket('udp4');
    this.HEADER = new Uint8Array([65,114,116,45,78,101,116,0,0,80,0,14,0,0,0,0,0,0]);
  }

  send(universe, data) {
  	// Calcualte the length
  	const length_upper = (data.length >> 8) & 0xff;
  	const length_lower = data.length & 0xff;
    // Calcualte the universe
    const universe_upper = (universe >> 8) & 0xff;
    const universe_lower = universe & 0xff;
    // set LENGTH
    this.HEADER.set([length_upper, length_lower], 16);
    // universe
    this.HEADER.set([universe_lower, universe_upper], 14);

  	let buf = Buffer.concat([
      Buffer.from(this.HEADER.buffer),
      Buffer.from(data.buffer)
    ], data.length + this.HEADER.length);

    // send the ART-NET buffer
  	this._socket.send(buf, 0, buf.length, this._port, this._host, () => {});
  }

  close() {
  	this._socket.close();
  }
}

module.exports = ArtNetClient;
