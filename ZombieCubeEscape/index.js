const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

var zombieTick = 0;
var zombieSummonTick = 100;

function collision(a,b){
    if (
        a.x < b.x + rect2.w &&
        a.x + a.w > rect2.x &&
        a.y < rect2.y + rect2.h &&
        a.y + rect1.h > rect2.y
      ) {
}

class Player {
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = 0;
        this.vy = 0;
    }
}
class Projectile {
    constructor(x,y,vx , vy){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.vx = vx;
        this.vy = vy;
    }
}
Projectile.prototype.draw = function() {
    ctx.fillStyle = "darkred"
    ctx.fillRect(this.x, this.y, this.width, this.height);
};

Projectile.prototype.move = function() {
    this.x += this.vx
    this.y += this.vy
};

var player = new Player(WIDTH / 2 ,  HEIGHT / 2 , 30 , 30);



var zombies = []
var spawnX = [canvas.width - 100, 0 + 100]
var spawnY = [canvas.height - 100, 0 + 100]

var Projectiles = []

class Zombie {
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = 0;
        this.vy = 0;
    }
}
Zombie.prototype.move = function() {
    if (player.x  > this.x) {
        this.vx = 1
    }
    if (player.x  < this.x) {
        this.vx = -1
    }

    if (player.y  > this.y) {
        this.vy = 1
    }
    if (player.y  < this.y) {
        this.vy = -1
    }

    this.x += this.vx
    this.y += this.vy

};
Zombie.prototype.draw = function() {
    ctx.fillStyle = "rgb(52, 117, 50)"
    ctx.fillRect(this.x, this.y, this.width, this.height);
};

function spawnZombie(){
    var x = spawnX[Math.floor(Math.random() * spawnX.length)]
    var y = spawnY[Math.floor(Math.random() * spawnY.length)]
    var zomb = new Zombie(x,y,50,50)
    zombies.push(zomb)
}

function animate(){
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0,0, canvas.width, canvas.height)

    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    player.x += player.vx;
    if (player.x + player.width > canvas.width || player.x < 0) {
        player.vx *= -1
        player.x += player.vx
        player.vx = 0
    }
    player.y += player.vy;
    if (player.y + player.height > canvas.height || player.y < 0) {
        player.vy *= -1
        player.y += player.vy
        player.vy = 0
    }

    Projectiles.forEach((projctile) => {
        projctile.move()
        projctile.draw()
    });

    zombies.forEach((zombie) => {
        zombie.move()
        zombie.draw()
        console.log(collision(player,zombie))
    });
    if (zombieTick % zombieSummonTick === 0) {
        spawnZombie();
    }
    zombieTick++;
    requestAnimationFrame(animate)
};

animate();
var speed = 5;
window.addEventListener("keydown", (event) => {
    if (event.key == "w"){
        player.vy = -speed
        player.vx = 0
    }
    if (event.key == "s"){
        player.vy = speed
        player.vx = 0
    }
    if (event.key == "a"){
        player.vx = -speed
        player.vy = 0
    }
    if (event.key == "d"){
        player.vx = speed
        player.vy = 0
    }
  });
var spacePressed = false
window.addEventListener("keydown", (event) => {
    if (event.key == " "){
        if (spacePressed == false){
            var proj = new Projectile(player.x + player.width / 2 + 5, player.y + player.height / 2 + 5, player.vx * 3, player.vy * 3)
            Projectiles.push(proj)
        }
        spacePressed = true
    }
});

window.addEventListener("keyup", (event) => {
    if (event.key == " "){
        spacePressed = false
    }
})

