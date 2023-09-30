const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


var socket = io()
var scrollX = 0;
var scrollY = 0;

var sc = 3;
ctx.scale(sc,sc);

const width = canvas.width
const height = canvas.height

var frontEndPlayers = []

function isCollide( box1, box2 ) {
    return (
      box1.x + box1.width >= box2.x && 
      box2.x + box2.width >= box1.x && 
      box1.y + box1.height >= box2.y && 
      box2.y + box2.height >= box1.y 
    )
  }

var circle = function(x,y,radius,color){
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI * 2, false)
    ctx.fill();
}

class Square {
    constructor(x, y, width, height, isWall) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.isWall = isWall;
    }
}
Square.prototype.draw = function(){
    ctx.fillStyle = 'black'
    if (this.isWall){
        ctx.fillStyle = 'grey'
    }
    ctx.fillRect(this.x - scrollX, this.y - scrollY, this.width, this.height)
}

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
Player.prototype.draw = function(){
    circle(this.x - scrollX,this.y - scrollY,this.radius,this.radius, this.color)
}

function addPlayer(p){
    frontEndPlayers.push(new Player(p.x, p.y, p.radius, 'blue', 0,0, p.radius, p.radius));
}

socket.on('updatePlayers', (players) => {
    console.log("emitted updatePlayers event")
    console.log(players)
    var arrayLength = players.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log(players[i])
        //Do something
    }
})

const grid = []
const walls = []

const dividend = 2 * sc
const player = new Player(canvas.width / dividend,canvas.height / dividend, 1, 'red')

walls.push(new Square(0,0, 10, canvas.height + 10, true))
walls.push(new Square(canvas.width,0, 10, canvas.height + 10, true))
walls.push(new Square(0,0, canvas.width + 10, 10 + 10, true))
walls.push(new Square(0,canvas.height, canvas.width + 10, 10 + 10, true))




var w = width / 10;
var h = height / 10;
function* times(x) {
    for (var i = 0; i < x; i++)
      yield i;
  }
 
for (var x of times(w+1)) {
    for (var y of times(h+1)) {
        var square = new Square(x*10, y * 10, 9,9, false);
        grid.push(square)
    }
}




function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    grid.forEach((square) => {
        square.draw()
    });
    scrollX += player.vx;
    scrollY += player.vy;
    player.x += player.vx;
    player.y += player.vy;
    walls.forEach((wall) => {
        wall.draw()
        if (isCollide(wall,player)){
            player.x -= player.vx
            player.y -= player.vy
            scrollX -= player.vx
            scrollY -= player.vy
        }
    });
    frontEndPlayers.forEach((p) => {
        p.draw()
    });




    player.draw()
    window.requestAnimationFrame(animate);
}

animate()   




const sq = grid[20]

scrollX += player.vx

ctx.fillRect(sq.x, sq.y, sq.width, sq.height)
var speed = 0.5
window.addEventListener("keydown", (event) => {
    if (event.key === "d") {
        player.vx = 0
        player.vx += speed;
        if (player.vx >= speed){
            player.vx = speed
        }
    }
    if (event.key === "a") {
        player.vx = 0
        player.vx += -speed;
        if (player.vx <= -speed){
            player.vx = -speed
        }
    }
    if (event.key === "w") {
        player.vy = 0
        player.vy += -speed;
        if (player.vy >= speed){
            player.vy = speed
        }
    }
    if (event.key === "s") {
        player.vy = 0
        player.vy += speed;
        if (player.vy <= -speed){
            player.vy = -speed
        }
    }
});
window.addEventListener("keyup", (event) => {
    if (event.key === "d") {
        player.vx = 0
    }
    if (event.key === "a") {
        player.vx = 0
    }
    if (event.key === "w") {
        player.vy = 0
    }
    if (event.key === "s") {
        player.vy = 0
    }
});

  