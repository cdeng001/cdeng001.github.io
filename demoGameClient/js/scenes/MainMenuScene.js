function onMainMenuSceneInit(){

    if(Crafty('MenuCtrl').length > 0){
        Crafty('MenuCtrl')
            .get(0)
            .initMenuType('MainMenu');
    }
    else{
        Crafty.e('MenuCtrl')
            .MenuCtrl()
            .initMenuType('MainMenu');
    }

    game.refreshCharPanels();
}

function onMainMenuSceneExit(){}

