addEventListener("keydown", (event) => {
    var key = event.key
    console.log()
    if (key == a){
        player.a = 1;
        player.d = 0;
    }else if( key == "d"){
        player.a = 0;
        player.d = 1;
    }
    if (key == "w"){
        player.w = 1;
        player.s = 0;
    }else if( key == "s"){
        player.w = 0;
        player.s = 1;
    }


});