const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

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

var player = new Player(WIDTH / 2 ,  HEIGHT / 2 , 30 , 30);


function animate(){
    ctx.fillStyle = "rgba(0,0,0,0.2saw)"
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