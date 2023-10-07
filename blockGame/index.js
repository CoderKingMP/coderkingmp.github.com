const canvas = document.getElementById("canvas");

const context = canvas.getContext("2d");

const width = window.innerWidth/3;
const height = window.innerHeight/1.5;

canvas.width = width
canvas.height = height

const GRAVITY = 0.3





var Player = function(x,y,width,height,color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.vx = 1;
    this.vy = 5;
}
Player.prototype.draw = function() {
    context.fillStyle = this.color;
    context.fillRect(this.x,this.y,this.width,this.height);
}
Player.prototype.update = function() {
    this.vy -= GRAVITY
    this.x -= 1
    this.vx *= 0.9
    this.y -= this.vy
}
    

const player = new Player(100,200, 20, 40, "red")

function animate(){
    context.clearRect(0,0,width,height)

    player.update()
    player.draw()
    window.requestAnimationFrame(animate);
}
animate()

window.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        player.vy == 5
    }
});