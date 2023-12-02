
function animate(){
    ctx.clearRect(0,0,width,height);
    drawField(fieldBlock, dirtBlock)
    floor(floorBlock)
    drawPlayers()

    requestAnimationFrame(animate)   
}

function movePlayer(){
    player.move()
}

window.onload = function() {
    
    requestAnimationFrame(animate)
}


socket.on('updatePlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
        const backendPlayer = backendPlayers[id]
        if (!frontEndPlayers[id]){
            frontEndPlayers[id] = new Player({
                x:backendPlayer.x,
                y:backendPlayer.y, 
                width:backendPlayer.width,
                height:backendPlayer.height,
                color: backendPlayer.color});
        }
    }
    for (const id in frontEndPlayers){
        if (!backendPlayers[id]){
            delete frontEndPlayers[id]
        }
    }
})