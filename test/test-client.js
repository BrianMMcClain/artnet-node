var Buffer = require('buffer').Buffer;
var dgram = require('dgram');
var log = require('util').log;

SERVER_HOST = '127.0.0.1';
SERVER_PORT = 6454;

var HEADER = [65, 114, 116, 45, 78, 101, 116, 0, 0, 80, 0, 14];
var SEQUENCE = [0];
var PHYSICAL = [0];
var UNIVERSE = [0, 0];
var LENGTH = [0, 13];
var TEST_DATA = [255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];

var data = HEADER.concat(SEQUENCE).concat(PHYSICAL).concat(UNIVERSE).concat(LENGTH).concat(TEST_DATA);
var buf = Buffer(data);

log(buf.toString());

var sock = dgram.createSocket("udp4");
sock.send(buf, 0, buf.length, SERVER_PORT, SERVER_HOST);