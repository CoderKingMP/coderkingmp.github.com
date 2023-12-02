const express = require("express");
const http = require('http');
const { Server }  = require('socket.io');
const { isObject } = require("util");
const app = express();

const port = process.env.PORT || 3000;  

const server = http.createServer(app);
const io = new Server(server, { pingInterval: 2000, pingTimeout: 10000});
server.listen(3000);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})


const backendPlayers = {}

io.on('connection', (socket) => {
  console.log('A User Has Connected');
  backendPlayers[socket.id] = {
    x: Math.random() *  500,
    y:Math.random() * 300,
    width: 20,
    height: 20,
    color: `hsl(${Math.random() * 360},100%,50%)`
  }

  socket.on('disconnect', (reason) => {
    console.log(reason)
    delete backendPlayers[socket.id]
    io.emit('updatePlayers', backendPlayers)
  })

  io.emit('updatePlayers', backendPlayers)
  console.log(backendPlayers)
})


console.log('server up and running')