const express = require('express')
const app = express()

// socket.io setup
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

class Player {
  constructor(x,y,radius, color){
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.vx = 0;
      this.vy = 0;
      this.width = radius;
      this.height = radius;
  }
}

const port = process.env.port  ||3000

const players = []

app.use(express.static('Multiplayer'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  players[socket.id] = new Player(100,100,10,0.5,0, 10,10)
  console.log(players);
  io.emit("updatePlayers", players)
});


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log("server loaded")