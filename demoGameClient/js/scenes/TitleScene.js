function onTitleSceneInit(){
    Crafty.background("black");
    var w = 100,
        h = 20,
        x = game.getWindowWidth()/2 - w/2,
        y = game.getWindowHeight()/2 - h/2;

    Crafty.e("2D, DOM, Text, GameTitle")
        //size of words
        .attr({ w: w, h: h, x: x, y: y })
        //text align of words
        .css({ "text-align": "center"})
        //text color
        .textColor("#FFFFFF")
        .text("GAME TITLE")
    ;

    Crafty.e("2D, DOM, Text, Keyboard")
        //size of words
        .attr({ w: w, h: h, x: x, y: y+40 })
        //text of words
        .text("Press Space/ Press A for demo")
        //text align of words
        .css({ "text-align": "center"})
        //text color
        .textColor("#FFFFFF")
        //key binds, on space press, should advance to name page
        .bind('KeyDown', function(e) {
            if(e.key == Crafty.keys.SPACE) {
                game.setCurrentScene("LoginScene");
            }

            //for testing
            if(e.key == Crafty.keys.A){
                var sampleData = {
                    level: {
                        name: "Sample Level",
                        enemyArray: [
                            'PirateShark'
                        ]
                    },
                    team: {
                        redUnit: 'RedRobot',
                        blueUnit: 'BlueRobot',
                        greenUnit: 'GreenRobot',
                        yellowUnit: 'YellowRobot',
                    }
                };

                game.setCurrentScene("GameScene", sampleData);
            }

            if(e.key == Crafty.keys.S){
                game.setCurrentScene('ShopScene');
            }
        })
    ;
}

function onTitleSceneExit(){}

