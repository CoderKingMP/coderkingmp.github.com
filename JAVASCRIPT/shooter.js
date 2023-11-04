console.log("shooter js up and running")

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var speed = 1.5;

var heroImage = document.getElementById("hero")
var swordImage = document.getElementById("sword")
var swords = []


var Sword = function(x,y,width,height,vx,vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.width = width;
    this.height = height;
    this.mouseX = 0;
    this.mouseY = 0;
    this.destoyTime = 100;
}


Sword.prototype.draw = function(){
    ctx.drawImage(swordImage,this.x - (this.width / 2),this.y - (this.height / 2),this.width,this.height)
}
Sword.prototype.update = function(){
    // Move Player
    this.x += this.vx
    this.y += this.vy
    // Check Collissions with bounds
    if (this.x < this.width / 2){
        this.x  = this.width / 2
        this.vx *= -1
    }
    if (this.x > canvas.width - this.width / 2){
        this.x  = canvas.width - this.width / 2
        this.vx *= -1
    }
    if (this.y < this.height){
        this.y  = this.height
        this.vy *= -1
    }
    if (this.y > canvas.height - this.height / 2){
        this.y  = canvas.height - this.height / 2
        this.vy *= -1
    }


    // Check destroyTime
    this.destoyTime --
    if (this.destoyTime == 0){
        return true
    }

}


var Player = function(x,y,width,height,color , waitTime) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.hasSword = true;
    this.waitTime = waitTime;
    this.throwTime  = this.waitTime;
    this.mouse = {
        keyW: false,
        keyA: false,
        keyS: false,
        keyD: false
    }
}

Player.prototype.drawHero = function(){
    ctx.drawImage(heroImage,this.x - (this.width / 2),this.y - (this.height / 2),this.width,this.height)
}
Player.prototype.drawSword = function(){
    ctx.drawImage(swordImage,this.x - (this.width / 2) + this.width,this.y - (this.height / 2),this.width,this.height)
}
Player.prototype.update = function(){
    // Move Player
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
    // Check Collissions with bounds
    if (this.x < this.width / 2){
        this.x  = this.width / 2
    }
    if (this.x > canvas.width - this.width / 2){
        this.x  = canvas.width - this.width / 2
    }
    if (this.y < this.height - this.height / 2){
        this.y  = this.height - this.height / 2
    }
    if (this.y > canvas.height - this.height / 2){
        this.y  = canvas.height - this.height / 2
    }
}
var thowWaitTime = 15
var player = new Player(100,100,10,10,"black" , thowWaitTime)
var bulletSpeed = 1.5

function getVxfromXy(x,y){
    var direction = Math.atan2(player.y - y, player.x - x);
    var direction = direction * (180/Math.PI);
    var vx = Math.sin(direction);
    return vx * bulletSpeed
}
function getVyfromXy(x,y){
    var direction = Math.cos(player.x - y, player.x - x) * 180 / Math.PI;
    var vy = Math.cos(direction);
    return vy * bulletSpeed
}


var animate = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)

    player.drawHero()
    player.drawSword()
    player.update()
    player.throwTime -= 1

    swords.forEach((sw,i) => {
        sw.draw();
        var shouldDestroy = sw.update();
        if (shouldDestroy){
            swords.splice(i,1);
        }
      });
    

    ctx.filStyle = 'black'
    ctx.fillRect(player.mouseX, player.mouseY, 20, 20);
    
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

  document.addEventListener('keydown', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === " ") {
        if (player.throwTime <= 0){
            var vx = getVxfromXy(player.mouseX * 2,player.mouseY * 2);
            var vy = getVyfromXy(player.mouseX * 2,player.mouseY * 2);
            swords.push(new Sword(player.x,player.y, 10,10,vx,vy))
            player.throwTime = player.waitTime
        }

    }
  }, false);
  



  document.addEventListener('mousemove', (event) => {
    var x  = event.clientX;
    var y = event.clientY
    player.mouseX = x * 0.2
    player.mouseY = y * 0.2
  }, false);