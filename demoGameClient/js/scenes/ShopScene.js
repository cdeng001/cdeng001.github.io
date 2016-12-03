function onShopSceneInit(){

    if(Crafty('MenuCtrl').length > 0){
        Crafty('MenuCtrl')
            .get(0)
            .initMenuType('Shop');
    }
    else{
        Crafty.e('MenuCtrl')
            .MenuCtrl()
            .initMenuType('Shop');
    }
}

function onShopSceneExit(){}
