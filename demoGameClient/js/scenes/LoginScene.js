function onLoginSceneInit(){

    var btn_w = 100,
        btn_h = 25;

    Crafty.e('FunctionButton')
        .setPos(game.getWindowWidth()/2 - btn_w/2, game.getWindowHeight()/2 - btn_h/2)
        .setSize(btn_w, btn_h)
        .setName('Login')
        .setFunction(function(){
            if(Crafty('LoginPanel').length < 1 && Crafty('CreatePanel').length < 1){
                Crafty.e('LoginPanel, Tween')
                    .tween({
                        y: 0
                    }, 500)
                ;
            }
        })
    ;

    Crafty.e('FunctionButton')
        .setPos(game.getWindowWidth()/2 - btn_w/2 , game.getWindowHeight()/2 - btn_h/2 + 35)
        .setSize(btn_w, btn_h)
        .setName('Create')
        .setFunction(function(){
            if(Crafty('LoginPanel').length < 1 && Crafty('CreatePanel').length < 1){
                Crafty.e('CreatePanel, Tween')
                    .tween({
                        y: 0
                    }, 500)
                ;
            }
        })
    ;

}

function onLoginSceneExit(){}

