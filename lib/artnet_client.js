'use strict';

const dgram = require('dgram');
const Buffer = require('buffer').Buffer;

class ArtNetClient {

  constructor(host, port) {
  	this._host = host;
  	this._port = port;
  	this._socket = dgram.createSocket('udp4');

    // ART-NET HEADER _ using ascii code
    this.HEADER = new Uint8Array(18);
  	this.HEADER.set([65, 114, 116, 45, 78, 101, 116, 0, 0, 80, 0, 14]); // 0 - 11

    // set SEQUENCE
  	// this.HEADER.set([0], 12);

  	// set PHYSICAL
  	// this.HEADER.set([0], 13);

  	// set UNIVERSE
  	// this.HEADER.set([0, 0], 14);
  }

  send(data) {
  	// Calcualte the length
  	const length_upper = Math.floor(data.length / 256);
  	const length_lower = data.length % 256;

    // set LENGTH
    this.HEADER.set([length_upper, length_lower]);

    // merge Uint8Arrays
    const mArray = new Uint8Array(this.HEADER.length + data.length);
    mArray.set(this.HEADER);
    // append data after header
    mArray.set(data, this.HEADER.length);

    // convert the Uint8Array to Buffer
  	const buf = Buffer.from(mArray);
    // send the ART-NET buffer
  	this._socket.send(buf, 0, buf.length, this._port, this._host, function(){});
  }

  close() {
  	this._socket.close();
  }
}

module.exports = ArtNetClient;
