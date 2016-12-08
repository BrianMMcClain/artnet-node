'use strict';

const Client = require('../main').Client;
const client = new Client('127.0.0.1', 6454);

client.send(createBuffer(1));
setTimeout(() => client.send(createBuffer(3)), 500);
setTimeout(() => client.send(createBuffer(50)), 1000);
setTimeout(() => client.close(), 1500);

function createBuffer(length) {
  // each led will receive and RGB so 3 values per led.
  length *= 3;
  console.log('creating buffer with length:', length);
  const data = new Uint8Array(length);
  for(let i = 0; i < length; i += 3) {
    data[i]     = Math.round(Math.random() * 255); // Red
    data[i + 1] = Math.round(Math.random() * 255); // Green
    data[i + 2] = Math.round(Math.random() * 255); // Blue
  }
  return data;
}
