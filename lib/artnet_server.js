const dgram = require('dgram')

// ArtNet server class
exports.listen = (port, cb) => {
  this.port = port
  // Set up the socket
  // msg is a buffer which is a Uint8Array
  const sock = dgram.createSocket('udp4', function (msg, peer) {
    // Deseralize the data - magic numbers are as per the Art-Net protocol
    var sequence = msg[12]
    var physical = msg[13]
    var universe = (msg[14] * 256) + msg[15]
    var length = (msg[16] * 256) + msg[17]
    var rawData = msg.slice(18, msg.length)
      // Build the associative array to return
    var retData = {sequence: sequence, physical: physical, universe: universe, length: length, data: rawData}
    // And call the callback passing the deseralized data
    cb(retData, peer)
  })
  sock.bind(port)
}
