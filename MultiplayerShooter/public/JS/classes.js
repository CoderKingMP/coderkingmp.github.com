class Player {
    constructor({x,y, width,height, color}) {
        this.x = x;
        this.y = y;
        this.width  = width;
        this.height = height;
        this.d = 0;
        this.a = 0;
        this.w = 0;
        this.s = 0;
        this.color = color;
      }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y ,this.width,this.height);
    }
    move(){
        this.x += this.d;
        this.x -= this.a;
        this.y += this.w;
        this.y -= this.s;
    }
}

