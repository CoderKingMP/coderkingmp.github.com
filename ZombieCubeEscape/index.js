const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

var zombieTick = 0;
var zombieSummonTick = 100;

var fireTick = 0;
var fireSummonTick = 25;

function collision(a,b){
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
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
        this.health = 3;
        this.speed = 0.5;
    }
}
Zombie.prototype.move = function() {
    if (player.x  > this.x) {
        this.vx = this.speed
    }
    if (player.x  < this.x) {
        this.vx = -this.speed
    }

    if (player.y  > this.y) {
        this.vy = this.speed
    }
    if (player.y  < this.y) {
        this.vy = -this.speed
    }

    this.x += this.vx
    this.y += this.vy

};
Zombie.prototype.draw = function() {
    ctx.fillStyle = "rgb(52, 117, 50)"
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    ctx.font = "75px Standard Font";
    ctx.fillStyle = "darkred";
    ctx.fillText(this.health, this.x + 25, this.y)
};

function spawnZombie(){
    var x = spawnX[Math.floor(Math.random() * spawnX.length)]
    var y = spawnY[Math.floor(Math.random() * spawnY.length)]
    var zomb = new Zombie(x,y,100,100)
    zombies.push(zomb)
}

function reset(){
    player.x = canvas.width / 2
    player.y = canvas.height / 2
    player.vx = 0
    player.vy = 0
    zombies = []
    Projectiles = []
}

function fire(){
    if (Math.abs(player.vx) > 0 || Math.abs(player.vy) > 0){
        var proj = new Projectile(player.x + player.width / 2 + 5, player.y + player.height / 2 + 5, player.vx * 3, player.vy * 3)
        Projectiles.push(proj)
    }
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
        if (projctile.x + projctile.width > canvas.width || projctile.x < 0 || projctile.y < 0 || projctile.y + projctile.height > canvas.height){
            var index = Projectiles.indexOf(projctile)
            Projectiles.splice(index, 1)
        }
        projctile.move()
        projctile.draw()
        zombies.forEach((zombie) => {
            if (collision(projctile, zombie)){
                zombie.health -= 1
                zombie.width /= 1.5
                zombie.height /= 1.5
                zombie.x += zombie.width /2
                zombie.y += zombie.height / 2
                zombie.speed += 1
                if (zombie.health == 0){
                    var index = zombies.indexOf(zombie)
                    zombies.splice(index, 1)
                }
                var index = Projectiles.indexOf(projctile)
                Projectiles.splice(index, 1)

            }
        });
    });

    zombies.forEach((zombie) => {
        zombie.move()
        zombie.draw()
        if (collision(player,zombie)){
            reset()
        }
    });
    if (zombieTick % zombieSummonTick === 0) {
        spawnZombie();
    }
    if (fireTick % fireSummonTick === 0) {
        fire()
    }
    fireTick ++
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

