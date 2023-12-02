function play(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}

function drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}

function drawFloor(x,y , fieldBlock){
    ctx.drawImage(fieldBlock,x,y,32,32);
}
function drawField(fieldBlock , dirtBlock){
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0,width,innerHeight)
}
function floor(floorBlock){
    ctx.drawImage(floorBlock, 0 - scrollX,275, 3200,30)
}


function drawPlayers(){
    for (const id in frontEndPlayers){
        const player = frontEndPlayers[id];
        player.draw()
    }
}
