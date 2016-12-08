'use strict';

const Server = require('../main').Server;
const server = Server.listen(6454, (msg, peer) => {
  console.log("-----------------");
	console.log("Sequence: " + msg.sequence);
	console.log("Physical: " + msg.physical);
	console.log("Universe: " + msg.universe);
	console.log("Length: " + msg.length);
	console.log("Data length: " + msg.data.length);
	console.log("-----------------");
  // console.log(msg);
  // msg.data.forEach((item, index) => console.log(index, item));
});
console.log('Server Started.');
