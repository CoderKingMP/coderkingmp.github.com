
function animate(){
    ctx.clearRect(0,0,width,height);
    drawField(fieldBlock, dirtBlock)
    drawDirtBlocks(dirtBlock)
    player.draw()
    requestAnimationFrame(animate)   
}

function movePlayer(){
    player.move()
}

window.onload = function() {
    
    requestAnimationFrame(animate)
}
