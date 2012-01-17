var dgram = require('dgram');
var log = require('util').log;

HOSTNAME = "127.0.0.1"
PORT = 6454;

function broadcast(buf) 
{
	// sock.send(buf, 0, buf.length, port, host);
	log("Broadcast called");
}

function processMsg(msg, peer) {
  var str = msg.toString();
  str = str.replace(/[\n\r]/g, ""); 
  log(str)
}

sock = dgram.createSocket("udp4", function (msg, peer) {
  //var key = peer.address + ":" + peer.port;
  processMsg(msg, peer);
});

sock.on('listening', function() {
  log('Listening on '+ HOSTNAME + ':' + PORT);
});
sock.bind(PORT, HOSTNAME);