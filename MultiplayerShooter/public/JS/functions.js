function play(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}

function drawFieldBlock(x,y , fieldBlock){
    ctx.drawImage(fieldBlock,x,y,32,32);
}
function drawDirtBlock(x,y , dirtBlock){
    ctx.drawImage(dirtBlock,x,y,16,16);
}

function drawField(fieldBlock , dirtBlock){
    var blockX = 0;
    var blockY = 0;
    var timesX = width/32 + 1
    var timesY = height/32 + 1
    for (var i = 0; i < timesY; i++) {
        for (var y = 0; y < timesX; y++) {
            drawFieldBlock(blockX * 32, blockY * 32, fieldBlock)
            blockX ++;
        }
        blockY ++;
        blockX =0;
    }

}
function drawDirtBlocks(dirtBlock){
    var blockX = 0;
    var blockY = 285;
    drawDirtBlock(5 * 32, blockY, dirtBlock)
    var timesX = width/32 + 1
    for (var x = 0; x < timesX * 2 ; x++) {
        drawDirtBlock(blockX * 16, blockY, dirtBlock)
        blockX ++;
    }
}