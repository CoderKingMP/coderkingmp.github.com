console.log("shooter js up and running")

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var speed = 1;

var heroImage = document.getElementById("hero")
var swordImage = document.getElementById("sword")
console.log(swordImage)




var Player = function(x,y,width,height,color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.mouse = {
        keyW: false,
        keyA: false,
        keyS: false,
        keyD: false
    }
}

Player.prototype.draw = function(){
    ctx.drawImage(heroImage,this.x - (this.width / 2),this.y - (this.height / 2),this.width,this.height)
    ctx.drawImage(swordImage,this.x - (this.width / 2) + this.width,this.y - (this.height / 2),this.width,this.height)
}
Player.prototype.update = function(){
    
    if (player.mouse.keyW === true){
        this.y -= speed;
    }
    if (player.mouse.keyS === true){
        this.y += speed;
    }
    if (player.mouse.keyA === true){
        this.x -= speed;
    }
    if (player.mouse.keyD === true){
        this.x += speed;
    }
}
var player = new Player(100,100,10,10,"black")



var animate = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)

    player.draw()
    player.update()
    
    requestAnimationFrame(animate)
}

animate()

document.addEventListener('keydown', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w") {
        player.mouse.keyW = true;
    } 
    if (code === "s") {
        player.mouse.keyS = true;
    } 
    if (code === "a") {
        player.mouse.keyA = true;
    }
    if (code === "d") {
        player.mouse.keyD = true;
    }
}, false);
document.addEventListener('keyup', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w") {
        player.mouse.keyW = false;
    } 
    if (code === "s") {
        player.mouse.keyS = false;
    } 
    if (code === "a") {
        player.mouse.keyA = false;
    } 
    if (code === "d") {
        player.mouse.keyD = false;
    }
  }, false);