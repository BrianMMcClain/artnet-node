var sys = require('util');
var artnetsrv = require('../lib/ArtNetServer');

var srv = artnetsrv.listen('127.0.0.1', 6465);
