const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const socket = io();
const width = window.innerHeight;
const height = window.innerWidth;


var dirtBlock = document.getElementById("dirtBlock");
var fieldBlock = document.getElementById("GrassField");

ctx.scale(0.5,0.5)




class Player {
    constructor(x,y, width,height) {
        this.x = x;
        this.y = y;
        this.width  = width;
        this.height = height;
        this.d = 0;
        this.a = 0;
        this.w = 0;
        this.s = 0;
      }
    draw(){
        ctx.fillRect(player.x, player.y,player.width,player.height);
    }
    move(){
        this.x += this.d;
        this.x -= this.a;
        this.y += this.w;
        this.y -= this.s;
    }
}

var player = new Player(100,100 ,20,20)