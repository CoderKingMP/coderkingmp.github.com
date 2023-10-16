var canvas = document.getElementById("canvas");
var canvasInfo = canvas.getBoundingClientRect();
var xDiff = canvasInfo.left;
var yDiff = canvasInfo.top;
var ctx = canvas.getContext('2d');
var width = window.innerWidth/1.5;
var height = window.innerWidth/3;
canvas.width =width;
canvas.height = height;

var lavaTick = 0;
var lavaCheck  = 30;

var JumpadTick = 0;
var JumpadCheck = 5;



canvas.focus();





var levels = [
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,4,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,1,1,1,1,1,0,0,1,1,1,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,3,0,0,0,2,0,0,0,0,0,0,0,0,0,0,3,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],  
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],  
]
var gameBoard = [
    [],
    [],
    [],
    [],
    [],
    [],    
    [],
    [],
    [],
    []   
]
var resetGameBoard = [
    [],
    [],
    [],
    [],
    [],
    [],    
    [],
    [],
    [],
    []   
]



for (var i = 0; i < levels.length; i++) {
    var level = levels[i]
    for (var column = 0; column < 10; column++) {
        for (var row = 0; row < 20; row++) {
            var number = levels[i][column][row];
            gameBoard[column].push(number);
        }
    }
};

var multiplier = 1024/width;
var dirtImg = document.querySelector("#dirt");
var lavaImg = document.querySelector("#lava");
var Jumpad = document.querySelector("#Jumpad");
var JumpadUp = document.querySelector("#JumpadUp");
var Spawner = document.querySelector("#Spawner");
var ZombieImage = document.querySelector("#Zombie");
var fireBallImage = document.querySelector("#fireball");

// Jumpad Stats
var JumpadType = "down";
var JumpadForce = -12;

// Spawner Stats
var spawnTick = 0;
var spawnCheck = 100;

// Zombie Stats
var Zombies = []
var zombieMaxHealth = 3
var aliveZombies = 0

var playerMaxHealth = 100;

var scrollX = 0;
var shouldScroll = true;

var currentId = 0;
var gameFrame = 0;


var bulletDamage = 5;
var ProjectileSpawnLength = 7;

    /*calculations*/
var AnglestoOtherThing = 360 / (Math.PI * 2);
    /*variables */

var sunX = width*multiplier;
var sunY = 0+sunRadius;
var sunRadius = 30*multiplier;
var moonColor = "rgba(255,255,255,0.3)";
var sunColor = "rgba(255,255,21,1)";
var isDay = true;

var gamePlaying = true;

var players = [];
var projectiles = [];

var circleRadius = 8*multiplier;

var windRESISTANCE = 0.85;
var GRAVITY = 0.2*multiplier;
var jumpForce = 5*multiplier;
var movementSpeed = 2*multiplier;
var speed = 3*multiplier;

var currentLevel = 0;
var blockSize = width/20;
var blockColor = "green";
var deathColor = "red";




function reset() {
    projectiles = [];
    currentPlayer.x = blockSize;
    currentPlayer.y = height-(blockSize*4);
    currentPlayer.xVel = 0;
    currentPlayer.yVel = 0;
    currentPlayer.health = currentPlayer.maxHealth;
    newPlayer.x = width-blockSize*2;
    newPlayer.y = height-(blockSize*4);
    newPlayer.xVel = 0;
    newPlayer.yVel = 0;
    newPlayer.health = newPlayer.maxHealth;
    gamePlaying = true;

        var gameBoard = [
            [],
            [],
            [],
            [],
            [],
            [],    
            [],
            [],
            [],
            []   
        ]
    for (var i = 0; i < levels.length; i++) {
        var level = levels[i]
        for (var column = 0; column < 10; column++) {
            for (var row = 0; row < 20; row++) {
                var number = level[column][row];
                gameBoard[column].push(number);
            }
        }
    };
    
}

function touching(object1,object2) {
    return object1.x+object1.width > object2.x &&
           object1.y+object1.height > object2.y &&
           object1.x <= object2.x+object2.width &&
           object1.y <= object2.y+object2.height;
}

function circle(x,y,radius,fillCircle) {
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2,false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function drawBar(x,y,width,height,health,maxHealth,yOffset) {
    var xPosition = (x-width/2);
    var yPosition = (y-yOffset);
    ctx.fillStyle = "red";
    ctx.fillRect(xPosition - scrollX,yPosition,width,height);
    ctx.fillStyle = "limegreen";
    ctx.fillRect(xPosition - scrollX,yPosition,width*(health/maxHealth),height);
};





var Player = function(x,y,width,height,color,isPlayer) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.markedForDeletion = false;
    this.image = document.getElementById("cowboy");
    this.mouse = {
        x: undefined,
        y: undefined,
        clicked: false,
        keyW: false,
        keyA: false,
        keyS: false,
        keyD: false
    }
    this.isPlayer = isPlayer;
    this.yVel = 0;
    this.xVel = 0;
    this.onFloor = false;
    this.lastDirection = "right";
    this.id = currentId;
    currentId++;
    this.maxHealth = playerMaxHealth;
    this.health = this.maxHealth;
    this.player;
    if (this.id === 0) {
        this.player = 1;
    } else {
        this.player = 2;
    }
    this.image = document.querySelector("#cowboy");
    this.imgWidth = 96/3;
    this.imgHeight = 128/4;
    this.frameX = 0;
    this.frameY = 0;
    this.staggerFrames = 4;
    this.maxFrames = 3;
}
Player.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.font = (multiplier*15) + "px New Roman";
    ctx.fillStyle = "White";
    ctx.textAlign = "middle";
    ctx.textBaseline = "bottom";
    if (shouldScroll) {
        ctx.drawImage(this.image,
            this.frameX*this.imgWidth,
            this.frameY*this.imgHeight,
            this.imgWidth,
            this.imgHeight,
            (this.x-this.width/2) - scrollX,
            this.y-this.height/5,
            this.width*1.6,
            this.height*1.6);
        drawBar(this.x+this.width/2+1/5/2,this.y,this.width*1.5, this.height*0.1,this.health,this.maxHealth,10);
        if (this.player == 1){
            ctx.fillStyle = "Blue"
        }
        ctx.fillText("Player " +  this.player, this.x - scrollX, this.y - this.width * 0.3);
    } else {
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,
            this.frameX*this.imgWidth,
            this.frameY*this.imgHeight,
            this.imgWidth,
            this.imgHeight,
            this.x-this.width/2,
            this.y-this.height/5,
            this.width*1.6,
            this.height*1.6);
        drawBar(this.x+this.width/2+1/5/2,this.y,this.width*1.5, this.height*0.1,this.health,this.maxHealth,10);
        if (this.player == 1){
            ctx.fillStyle = "Blue"
        }
        ctx.fillText("Player " +  this.player, this.x, this.y - this.width * 0.3);
    }

}
Player.prototype.checkTouching = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 1) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    isTouching = true;
                }
            else if(number == 3){
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    this.yVel = jumpForce * -2
                }
            }
            }
        }
    }
    return isTouching;
};
Player.prototype.checkTouchingLava = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 2) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    isTouching = true;
                }
            }
        }
    }
    return isTouching;
};
Player.prototype.checkTouchingJumpad = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 3) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    isTouching = true;
                    this.yVel = JumpadForce;
                }
            }
        }
    }
    return isTouching;
};

Player.prototype.update = function() {
    this.xVel = this.xVel * windRESISTANCE;
    this.x += this.xVel;
    if (this.checkTouching() || this.x <= 0) {
        this.x -= this.xVel;
        this.xVel = 9;
    }

    if (this.mouse.keyW && this.onFloor) {
        this.yVel = 0- jumpForce;

    }
    if (this.mouse.keyA) {
        this.xVel = -1 * movementSpeed;
    }
    if (this.mouse.keyD) {
        this.xVel = 1 * movementSpeed;
    }


    this.yVel += GRAVITY;
    this.y += this.yVel;
    if (this.checkTouching()) {
        this.y -= this.yVel;
        if (this.yVel >= 0) {
            this.onFloor = true;
        }
        
        this.yVel = 0;
    } else {
        this.onFloor = false;
    }
    if (this.y <= 0) {
        this.y -= this.yVel;
        this.yVel = 0;
    }

    if (this.checkTouchingLava()) {
        this.health -= 1;
        if (this.health <= 0){
            this.player.health  = 0;
            gamePlaying = false;
            if (this.player === 1) {
                document.querySelector("#finalScore").innerHTML = "Player 2 Won!";
            }  else {
                document.querySelector("#finalScore").innerHTML = "Player 1 Won!";
            }
            document.querySelector(".deadDiv").style.display = "inline-block";
        }
    } 


    if (gameFrame % ProjectileSpawnLength === 1&& this.mouse.keyS) {
        var yVel = 0;
        var xVel;
        if (this.lastDirection === "right") {
            xVel = 1;
        } else {
            xVel = -1;
        }
         var projectile = new Projectile(
            this.x+this.width/2,
            this.y+this.height/5,
            xVel,
            yVel,
            this.id,
            this.color
        );
        projectiles.push(projectile);
    }

    if (gameFrame % this.staggerFrames === 0) {
        this.frameX++;
        if (this.frameX === this.maxFrames) {
            this.frameX = 0;
        }
      }    
}

var Zombie = function(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.markedForDeletion = false;
    this.image = ZombieImage;
    this.yVel = 0;
    this.xVel = 0;
    this.onFloor = false;
    this.lastDirection = "right";
    this.id = currentId;
    currentId++;
    this.maxHealth = zombieMaxHealth;
    this.health = this.maxHealth;
    this.imgWidth = 32;
    this.imgHeight = 32;
}

Zombie.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.font = (multiplier*15) + "px New Roman";
    ctx.fillStyle = "White";
    ctx.textAlign = "middle";
    ctx.textBaseline = "bottom";
    if (shouldScroll) {
        ctx.drawImage(this.image,this.x - scrollX,this.y);
        ctx.fillRect((this.x - this.width / 2) - scrollX,(this.y + this.height - 2),this.imgWidth,this.imgHeight);
        this.fillStyle = "dark-green";
        drawBar(this.x+this.width,this.y,this.width*1.5, this.height*0.1,this.health,this.maxHealth,10);
        
    }
}

Zombie.prototype.checkTouching = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 1) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    isTouching = true;
                }
            else if(number == 3){
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    this.yVel = jumpForce * -2
                }
            }
            }
        }
    }
    return isTouching;
};
Zombie.prototype.checkTouchingLava = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 2) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                }
            }
        }
    }
    return isTouching;
};
Zombie.prototype.checkTouchingJumpad = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 3) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    isTouching = true;
                    this.yVel = JumpadForce;
                }
            }
        }
    }
    return isTouching;
};

Zombie.prototype.checkTouchingJumpad = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 3) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    isTouching = true;
                    this.yVel = JumpadForce;
                }
            }
        }
    }
    return isTouching;
};

Zombie.prototype.checkTouchingLava = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 2) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    this.health -= 1;
                }
            }
        }
    }
    return isTouching;
};

Zombie.prototype.update = function() {
    if (this.markedForDeletion){
        var thisZombie = Zombies.find(this);
        Zombies.pop(thisZombie);
    }
    this.yVel += 2;
    this.xVel = this.xVel * windRESISTANCE;
    this.x += this.xVel;
    if (this.checkTouching() || this.x <= 0) {
        this.x -= this.xVel;
        this.xVel = 9;
    }

    this.xVel = 1


    this.yVel += GRAVITY;
    this.y += this.yVel;
    if (this.checkTouching()) {
        this.y -= this.yVel;
        this.yVel = 0;
        if (this.yVel >= 0) {
            this.onFloor = true;
        }
    } else {
        this.onFloor = false;
    }
    if (this.y <= 0) {
        this.y -= this.yVel;
        this.yVel = 0;
    }

    if (this.checkTouchingLava()) {
        this.health -= 1;
        if (this.health <= 0){
            this.markedForDeletion = true;
            var thisZombie = Zombies.find(this);
            Zombies.pop(thisZombie);
        }
    } 
    }


function newZombie(x,y){
    // x,y,width,height
    var zombie = new Zombie(x, y, blockSize, blockSize);
    Zombies.push(zombie);
    aliveZombies++;
}

var Projectile = function(x,y,xVel,yVel,playerID,color) {
    this.x = x;
    this.y = y;
    this.width = circleRadius*2;
    this.height = circleRadius*2;
    this.radius = circleRadius;
    this.xVel = xVel / 5;
    this.yVel = yVel / 5;
    this.playerID = playerID;
    this.color = color;
    this.damage = bulletDamage;
}

Projectile.prototype.draw = function() {
    ctx.fillStyle = this.color;
    circle(this.x - scrollX,this.y - scrollY,this.radius / 3,true);
    ctx.drawImage(fireBallImage, this.x*0.5, this.y * 0.5);
}

Projectile.prototype.checkTouching = function() {
    var isTouching = false;
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 1) {
                var x = row*blockSize;
                var y = column*blockSize;
                var touching = this.x+this.width > x &&
                this.y+this.height > y &&
                this.x <= x+blockSize &&
                this.y <= y+blockSize;
                if (touching) {
                    isTouching = true;
                }
            }
        }
    }
    return isTouching;
};

Projectile.prototype.update = function() {
    //do something later
    this.x += this.xVel*20*multiplier;
    this.y += this.yVel;
    if (this.checkTouching()) {
        this.markedForDeletion = true;
    }
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        if (player.id !== this.playerID) {
            if (touching(this,player)) {
                this.markedForDeletion = true;
                player.health -= this.damage;
                if (player.health <= 0) {
                    gamePlaying = false;
                    if (player.id === 0) {
                        document.querySelector("#finalScore").innerHTML = "Player 2 Won!";
                    }  else {
                        document.querySelector("#finalScore").innerHTML = "Player 1 Won!";
                    }
                    document.querySelector(".deadDiv").style.display = "inline-block";
                } 
            };
        }
    }
};


function drawGameBoard() {
    for (var column = 0; column < gameBoard.length; column++) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 1) {
                var x = row*blockSize;
                var y = column*blockSize;
                if (shouldScroll) {
                    ctx.drawImage(dirtImg,x-scrollX,y,blockSize,blockSize);
                } else {
                    ctx.drawImage(dirtImg,x,y,blockSize,blockSize);
                }
            } else if (number === 2) {
                var x = row*blockSize;
                var y = column*blockSize;
                if (shouldScroll) {
                    ctx.drawImage(lavaImg,x-scrollX,y,blockSize,blockSize);
                } else {
                    ctx.drawImage(lavaImg,x,y,blockSize,blockSize);
                }
            }
            else if (number == 3){
                var x = row*blockSize;
                var y = column*blockSize;
                if (shouldScroll) {
                    if (JumpadType == "down"){
                        ctx.drawImage(Jumpad, x - scrollX,y, blockSize, blockSize);
                    }else if (JumpadType == "up"){
                        ctx.drawImage(JumpadUp, x - scrollX,y, blockSize, blockSize);
                    }
                } else {
                    ctx.drawImage(Jumpad,x,y,blockSize,blockSize);
                }
            } else if (number == 4){
                var x = row*blockSize;
                var y = column*blockSize;
                if (shouldScroll) {
                    
                    ctx.drawImage(Spawner, x - scrollX,y, blockSize, blockSize);
                } else {
                    ctx.drawImage(Spawner,x,y,blockSize,blockSize);
                }
            }
        }
    }

    if (isDay) {
        ctx.fillStyle = sunColor; 
    }else {
        ctx.fillStyle = moonColor;
    }
    ctx.beginPath();
    ctx.arc(sunX,sunY,sunRadius,0,Math.PI*2,false);
    ctx.fill();
}


function getBlockAt(col,row){
    return gameBoard[col][row];
}
function setBlockAt(col,ro, type){
    gameBoard[col][ro] = type
}



function updateLava(){
    var changed = [
            [],
            [],
            [],
            [],
            [],    
            [],
            [],
            [],
            [],  
            []
    ]
    for (var i = 0; i < levels.length; i++) {
        var level = levels[i]
        for (var column = 0; column < 10; column++) {
            for (var row = 0; row < 20; row++) {
                var number = levels[i][column][row];
                gameBoard[column].push(number);
                changed[column].push(0);
            }
        }
    };
    
    for (var column = gameBoard.length-1; column > 0; column--  ) {
        for (var row = 0; row < gameBoard[0].length; row++) {
            var number = gameBoard[column][row];
            if (number === 2) {
                var changedNum = changed[column][row]
                if (changedNum == 0){

                
                    var blockBelow = getBlockAt(column+1,row);
                    var blockRight = getBlockAt(column, row+1)
                    var blockLeft = getBlockAt(column,row-1);

                    if (blockBelow == 0){
                        setBlockAt(column +1,row, 2);
                        changed[column+1][row] = 1
                    } 
                    if(blockRight == 0 && blockBelow === 1){
                        setBlockAt(column,row+1,2)
                        changed[column][row+1] = 1
                    } 
                    if(blockLeft == 0 && blockBelow === 1){
                        setBlockAt(column,row-1,2)
                        changed[column][row-1] = 1
                    }
                }
            }
        }
    }
}


var currentPlayer = new Player(blockSize,height-(blockSize*4),blockSize * 0.8,(blockSize*2) * 0.8,"yellow",true);
players.push(currentPlayer);
var newPlayer = new Player(width-blockSize*2,height-(blockSize*4),blockSize * 0.8,(blockSize*2) * 0.8,"blue",false);
players.push(newPlayer);

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    if (gamePlaying) {
        gameFrame++;
        ctx.clearRect(0,0,width,height);
        drawGameBoard();
        players.forEach((player,i) => {
            player.draw();
            player.update();
            player.checkTouchingJumpad();
          });
          projectiles.forEach((projectile,i) => {
            projectile.draw();
            projectile.update();
            if (projectile.markedForDeletion) {
                projectiles.splice(i,1);
            }
          });

        sunX-= 1*multiplier;
        if (sunX > width/2) {
            sunY--;
        } else {
            sunY++;
        }
        if (sunX + sunRadius < 0) {
            sunX = width;
            sunY = 0+sunRadius;
            if (isDay) {
                isDay = false;
                document.querySelector("#canvas").style.background = "linear-gradient(to bottom,black, rgba(0,0,0,0))";
            } else {
                document.querySelector("#canvas").style.background = "linear-gradient(to bottom,aqua, rgba(0,0,0,0))";
                isDay = true;
            }
        }

    }
    lavaTick++;
    if (lavaTick % lavaCheck == 0){
        updateLava()
    } 

    JumpadTick++;
    if (JumpadTick % JumpadCheck == 0){
        if (JumpadType == "down"){
            JumpadType = "up";
        }else if (JumpadType == "up"){
            Jumpad = "down";
        }
    }
    spawnTick++;
    var spawnedZombies = 0;
    if (spawnTick % spawnCheck == 0){
        if (aliveZombies <= 20){
            for (var column = 0; column < gameBoard.length; column++) {
                for (var row = 0; row < gameBoard[0].length; row++) {
                    var number = gameBoard[column][row];
                    if (number == 4) {
                        var x = row*blockSize;
                        var y = column*blockSize;
                        newZombie(x - scrollX,y);
                        spawnedZombies ++;
                    }
                }
            }
        }
        newZombie(100,300);
    }
    Zombies.forEach((zombie) => {
        zombie.draw();
        zombie.update();
      });

    var centerX = (players[0].x + players[1].x) / 2

    scrollX = centerX - width/2;


}

window.onload = function() {
    reset()
    gameLoop();

}


addEventListener('mousemove', (event) => {
    currentPlayer.mouse.x = event.clientX-xDiff;
    currentPlayer.mouse.x = event.clientX - yDiff;    
});
addEventListener('mousedown', (event) => {
    currentPlayer.mouse.clicked = true;
});
addEventListener('mouseup', (event) => {
    currentPlayer.mouse.clicked = false;
});


document.addEventListener('keydown', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w") {
        currentPlayer.mouse.keyW = true;
    } 
    if (code === "s") {
        currentPlayer.mouse.keyS = true;
    } 
    if (code === "a") {
        currentPlayer.mouse.keyA = true;
        currentPlayer.lastDirection = "left";
    }
    if (code === "d") {
        currentPlayer.mouse.keyD = true;
        currentPlayer.lastDirection = "right";
    }
  }, false);
document.addEventListener('keyup', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "w") {
        currentPlayer.mouse.keyW = false;
    } 
    if (code === "s") {
        currentPlayer.mouse.keyS = false;
    } 
    if (code === "a") {
        currentPlayer.mouse.keyA = false;
    } 
    if (code === "d") {
        currentPlayer.mouse.keyD = false;
    }
  }, false);





  document.addEventListener('keydown', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "ArrowUp") {
        newPlayer.mouse.keyW = true;
    } 
    if (code === "ArrowDown") {
        newPlayer.mouse.keyS = true;
    } 
    if (code === "ArrowLeft") {
        newPlayer.mouse.keyA = true;
        newPlayer.lastDirection = "left";
    }
    if (code === "ArrowRight") {
        newPlayer.mouse.keyD = true;
        newPlayer.lastDirection = "right";
    }
  }, false);
document.addEventListener('keyup', (event) => {
    var code = event.key;
    // Alert the key name and key code on keydown
    if (code === "ArrowUp") {
        newPlayer.mouse.keyW = false;
    } 
    if (code === "ArrowDown") {
        newPlayer.mouse.keyS = false;
    } 
    if (code === "ArrowLeft") {
        newPlayer.mouse.keyA = false;
    } 
    if (code === "ArrowRight") {
        newPlayer.mouse.keyD = false;
    }
  }, false);

  document.querySelector(".restartButton").onclick = function() {
    document.querySelector(".deadDiv").style.display = "none";
    reset();
  }