# artnet-node
## Art-Net Library for NodeJS

Using es6 syntax and newer version of NodeJS (6.9.1).


### Usage example



Server:
```
const Server = require('../main').Server

Server.listen(6454, (msg, peer) => {
  console.log('-----------------')
  console.log('Sequence: ' + msg.sequence)
  console.log('Physical: ' + msg.physical)
  console.log('Universe: ' + msg.universe)
  console.log('Length: ' + msg.length)
  console.log('Data length: ' + msg.data.length)
})
```

Client:
```
const Client = require('../main').Client
const client = new Client('192.168.1.213', 6454)

client.send(26, createBuffer(1))
setTimeout(() => client.send(0, createBuffer(3)), 500)
setTimeout(() => client.send(15, createBuffer(50)), 1000)
setTimeout(() => client.close(), 1500)

function createBuffer (length) {
  // each led will receive and RGB so 3 values per led.
  length *= 3
  console.log('creating buffer with length:', length)
  const data = new Uint8Array(length)
  for (let i = 0; i < length; i += 3) {
    data[i] = Math.round(Math.random() * 255) // Red
    data[i + 1] = Math.round(Math.random() * 255) // Green
    data[i + 2] = Math.round(Math.random() * 255) // Blue
  }
  return data
}
```

Client tested on [Enttec Pixelator](http://www.enttec.com/index.php?main_menu=Products&pn=70060)

![Pixelator Enntec test](./image.jpg?raw=true)

Forked from [https://github.com/BrianMMcClain/artnet-node](https://github.com/BrianMMcClain/artnet-node)
