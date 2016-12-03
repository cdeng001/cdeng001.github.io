function Game(){

    //screen dimensions
    this.screen_w = 320;
    this.screen_h = 500;

    //current screen, game always starts on title scene
    this.currentScene = "TitleScene";

    //getters for window dimensions
    this.getWindowWidth = function(){ return this.screen_w; };
    this.getWindowHeight = function(){ return this.screen_h; };

    //getter function for games current scene
    this.getCurrentScene = function(){ return this.currentScene; };

    //setter for changing scene
    this.setCurrentScene = function(sName, data){
        Crafty.enterScene(sName, data);
        this.currentScene = sName;
    };

    //init function
    this.init = function(){
        initCrafty(this.screen_w, this.screen_h);
        initSocket();
    };

    /*private function to load assets and set up game through Crafty engine.
        enable scenes for the game,
        set up custom components made from Crafty
        set up paths for audio/images
        load assets and start game
    */
    function initCrafty(w, h){
        Crafty.init(w, h, document.getElementById('game'));

        //initialize scenes - scene(sceneName, initFunction, endFunction)
        Crafty.defineScene("TitleScene", onTitleSceneInit, onTitleSceneExit);
        Crafty.defineScene("LoginScene", onLoginSceneInit, onLoginSceneExit);
        Crafty.defineScene("MainMenuScene", onMainMenuSceneInit, onMainMenuSceneExit);
        Crafty.defineScene("DungeonListScene", onDungeonListInit, onDungeonListExit);
        Crafty.defineScene("ShopScene", onShopSceneInit, onShopSceneExit);
        Crafty.defineScene("GameScene", onGameSceneInit, onGameSceneExit);
        Crafty.defineScene("ScoreScene", onScoreSceneInit, onScoreSceneExit);

        Crafty.paths({
            audio: "assets/sound/",
            images: "assets/images/"
        });

        initCraftyComponents();

        Crafty.load(assetsObj, // preload assets
            function() { //when loaded
                //begin game
                Crafty.enterScene("TitleScene");
            },

            function(e) { //progress
                //console.log(e);
            },

            function(e) { //uh oh, error loading
                console.log(e);
            }
        );
    }

    //private function to initialize Crafty components
    function initCraftyComponents(){
        UnitComponentInit();
        EnemyComponentInit();
        UIComponentInit();
    }

    //private function to enable connection and define client actions when receiving a server response
    function initSocket(){
        socket = io.connect("http://localhost:3000");

        socket.on("sendDungeonList", setUpDungeonList);
        socket.on("createAttempt", createAttempt);
        socket.on("loginAttempt", loginAttempt);
        socket.on("receiveUserDetails", setUserDetails);
        socket.on("receivePrize", receivePrize);
        socket.on('initRoom', initRoom);
    }

    this.sendCreateUser = function(obj){
        socket.emit('createUser', obj);
    };

    this.sendLoginUser = function(obj){
        socket.emit('loginUser', obj);
    };

    //display error in the Login Scene
    function displayErrorLogin(err){
        console.log(err);
        Crafty.e('FadingText')
            .setPos(0, 350)
            .setColor('white')
            .FadingText(err, 4000)
        ;
    }

    function createAttempt(obj){
        if(!obj.ok){
            displayErrorLogin(obj.err);
        }
        else{
            displayErrorLogin("Account created.");
        }
    }

    function loginAttempt(obj){
        if(!obj.ok){
            displayErrorLogin(obj.err);
        }
        else{
            //login to account
            sessionStorage.user = JSON.stringify(obj.user);
            game.setCurrentScene("MainMenuScene");
        }
    }

    //start a room with the parameters given, unless false
    function initRoom(obj){
        if(!obj.ready){
            console.log(obj.error);
            return;
        }

        game.setCurrentScene("GameScene", obj.data);

    }

    function setUpDungeonList(ary){
        //list dungeons, should set up window for scrolling
        console.log(ary);
    }

    function setUserDetails(obj){
        sessionStorage.user = JSON.stringify(obj);
        updateCharPanels();
    }

    this.getDungeonList = function(){
        socket.emit("getDungeonList");
    };

    //this function is used to initialize or refresh the panels for the character info
    this.refreshCharPanels = function(){
        //request the information from the server
        updateCharPanels();
    };

    this.getChestPull = function(color){
        socket.emit('getChestPull', color);
    };

    //the function to handle the userDetails request from server
    function updateCharPanels(){
        var obj = JSON.parse(sessionStorage.user);
        var tops = Crafty('TopCharPanel');
        if(tops.length > 0){
            //top panel exists, modify it
            tops
                .TopCharPanel(obj.username, obj.gold, obj.energy)
            ;
        }
        else{
            Crafty.e('TopCharPanel')
                .TopCharPanel(obj.username, obj.gold, obj.energy)
            ;
        }

        var bottoms = Crafty('BottomCharPanel');
        if(bottoms.length > 0){
            //top panel exists, modify it
            bottoms
                .BottomCharPanel(obj.teams)
                .setTeamIndex(obj.activeTeam)
            ;
        }
        else{
            Crafty.e('BottomCharPanel')
                .BottomCharPanel(obj.teams)
                .setTeamIndex(obj.activeTeam)
            ;
        }
    }

    function receivePrize(obj){
        console.log(obj);
    }

    this.test = function(){
        console.log('Testing');
    }

}

