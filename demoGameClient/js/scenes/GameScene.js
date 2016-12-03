function onGameSceneInit(data){
    Crafty.background("grey");

    Crafty.e("GameCtrl")
        .GameCtrl(data.level, data.team)
    ;

}

function onGameSceneExit(){}

