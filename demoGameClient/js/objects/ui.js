function UIComponentInit(){

    //menu/ui related objects ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //button component
    Crafty.c("SceneButton", {

        required: "2D, DOM",

        init: function(){

            //create the button body entity
            this._btnBody = Crafty.e("2D, DOM, Color, Mouse")
                .color("#f5f5f5")
            ;

            //create the button text entity
            this._btnText = Crafty.e("2D, DOM, Text")
                .css({
                    'text-align' : 'center',
                    'vertical-align' : 'middle',
                    'padding-top' : '5px'
                })
                .textColor("black")
            ;

            //attach newly created entitiys to this button
            this.attach(this._btnBody, this._btnText);
        },

        setSize: function(w, h){
            this._btnBody.w = w;
            this._btnBody.h = h;

            this._btnText.w = w;
            this._btnText.h = h;
            return this;
        },

        setPos: function(x, y){
            this._btnBody.x = x;
            this._btnBody.y = y;

            this._btnText.x = x;
            this._btnText.y = y;
            return this;
        },

        setScene: function(sceneName, btnText){
            this._btnText.text(btnText);

            this._btnBody.bind("Click", function(mouseEvent){
                game.setCurrentScene(sceneName);
            });

            return this;
        }
    });

    Crafty.c("FunctionButton", {
        required: "2D, DOM, Color, Mouse",

        init: function(){

            this._parentCtrl = null;
            this._function = function(){};
            this.color("#f5f5f5");

            //create the button text entity
            this._btnText = Crafty.e("2D, DOM, Text")
                .css({
                    'text-align' : 'center',
                    'vertical-align' : 'middle',
                    'padding-top' : '5px'
                })
                .textColor("black")
            ;

            //attach newly created entitiys to this button
            this.attach(this._btnText);
        },

        events: {
            'Click': function(e){
                var ctrl = this;

                if(this._parentCtrl != null){
                    ctrl = this._parentCtrl;
                }

                this._function.call(ctrl);
            }
        },

        setSize: function(w, h){
            this.w = w;
            this.h = h;

            this._btnText.w = w;
            this._btnText.h = h;
            return this;
        },

        setPos: function(x, y){
            this.x = x;
            this.y = y;

            this._btnText.x = x;
            this._btnText.y = y;
            return this;
        },

        setName: function(n){
            this._btnText.text(n);
            return this;
        },

        setColor: function(c){
            if(c == 'none'){
                this.color('white', 0);
            }
            else{
                this.color(c, 1);
            }

            return this;
        },

        setTextColor: function(c){
            this._btnText.textColor(c);
            return this;
        },

        setFunction: function(f, c){
            this._function = f;

            if(typeof c !== 'undefined'){
                this._parentCtrl = c;
            }

            return this;
        }
    });

    Crafty.c("ImageButton", {
        required: "2D, DOM, Mouse",

        init: function(){
            this._parentCtrl = null;
            this._function = function(){};
            this._sprite = null;
        },

        events: {
            'Click': function(e){
                var ctrl = this;

                if(this._parentCtrl != null){
                    ctrl = this._parentCtrl;
                }

                this._function.call(ctrl);
            }
        },

        setSize: function(w, h){
            this.w = w;
            this.h = h;
            return this;
        },

        setPos: function(x, y){
            this.origin_x = x;
            this.origin_y = y;

            this.x = x;
            this.y = y;
            return this;
        },

        setSprite: function(s){
            if(this._sprite != null){
                this.removeComponent(this._sprite);
            }
            this.addComponent(s);
            this._sprite = s;
        },

        setFunction: function(f, c){
            this._function = f;

            if(typeof c !== 'undefined'){
                this._parentCtrl = c;
            }

            return this;
        }
    });

    Crafty.c('MenuButton', {
        required: "ImageButton, Tween",
        init: function(){},
        MenuButton: function(type){
            switch(type){
                case 'dungeon':
                    this.setSprite('spr_menu_dungeon');
                    this._highlight = 'spr_menu_dungeon_lite';
                    break;
                case 'teams':
                    this.setSprite('spr_menu_teams');
                    this._highlight = 'spr_menu_teams_lite';
                    break;
                case 'inventory':
                    this.setSprite('spr_menu_inventory');
                    this._highlight = 'spr_menu_inventory_lite';
                    break;
                case 'shop':
                    this.setSprite('spr_menu_shop');
                    this._highlight = 'spr_menu_shop_lite';
                    break;
            }

            this.bind('MouseOver', function(e){
                this.removeComponent(this._sprite);
                this.addComponent(this._highlight);
                this.tween({
                    x: this.x + 25
                }, 500);
            });
            this.bind('MouseOut', function(e){
                this.removeComponent(this._highlight);
                this.addComponent(this._sprite);
                this.tween({
                    x: this.origin_x
                }, 500);
            });

            return this;
        }
    });

    Crafty.c("FadingText", {
        required: "2D, DOM, Text, Tween",

        init: function(){
            this.attr({
                w: game.getWindowWidth(),
                h: 50
            }).css({
                'text-align' : 'center',
                'vertical-align' : 'middle',
                'padding-top' : '5px'
            });
        },

        FadingText: function(phrase, duration){
            this.text(phrase);
            this.timeout(function(){
                this
                    .tween({
                        alpha: 0.0
                    }, 1000)

                    .bind('TweenEnd', function(){
                        this.destroy();
                    });
            }, duration);
            return this;
        },

        setPos: function(x, y){
            this.attr({
                x: x,
                y: y
            });
            return this;
        },

        setColor: function(c){
            this.textColor(c);
            return this;
        }
    });

    //text input are
    Crafty.c('TextInput', {
        required: '2D, DOM, Mouse, Text, Keyboard',
        init: function(){
            this._displayText = "";
            this._max = 25;
            this._caps = false;

        },

        TextInput: function(x, y, w, h, max, protect){
            this
                .attr({
                    x: x,
                    y: y,
                    w: w,
                    h: h
                })
                .css({
                    'text-align' : 'center',
                    'vertical-align' : 'middle',
                    'padding-top' : '5px'
                })
            ;

            if(typeof max == 'number'){
                this._max = max;
            }

            this._protected = protect;

            return this;
        },

        events: {
            'Click' : function(e){
                //if there are any other active text inputs, deactivate them
                console.log('click');
                Crafty('ActiveTextInput').each(function(){
                    this.deactivate();
                });

                this.activate();
            },

            'KeyDown': function(e){
                if(this.has('ActiveTextInput')){
                    //grabbed digit or alpha
                    if(e.key >= 58 && e.key <= 90) {
                        //check if name length is good
                        if(this._displayText.length < this._max){
                            if(this._caps){
                                this._displayText += String.fromCharCode(e.keyCode);
                            }
                            else{
                                this._displayText += String.fromCharCode(e.keyCode).toLowerCase();
                            }

                        }
                    }
                    else if(e.key >= 48  && e.key <= 57){
                        if(this._displayText.length < this._max){
                            this._displayText += String.fromCharCode(e.keyCode);
                        }
                    }
                    else if(e.key == Crafty.keys.BACKSPACE){
                        if(this._displayText.length > 0){
                            this._displayText = this._displayText.substring(0, this._displayText.length - 1);
                        }
                    }
                    else if(e.key == Crafty.keys.SHIFT){
                        this._caps = true;
                    }

                    if(this._protected){
                        this.text(new Array(this._displayText.length + 1).join( '*' ));
                    }
                    else{
                        this.text(this._displayText);
                    }
                }
            },

            'KeyUp': function(e){
                if(e.key == Crafty.keys.SHIFT){
                    this._caps = false;
                }
            }
        },

        activate: function(){
            this.addComponent('ActiveTextInput')
        },

        deactivate: function(){
            this.removeComponent('ActiveTextInput');
        },

        setTextColor: function(c){
            this.textColor(c);
            return this;
        }
    });

    //panels
    Crafty.c('LoginPanel', {
        required: "2D, DOM, Text, spr_login_form",

        init: function(){
            this.attr({
                x: 10,
                y: -300
            });

            //attach the components of the form to this object
            this._username = Crafty.e('TextInput')
                    .TextInput(this.x + 57, this.y + 66, 185, 20, 25, false)
                    .setTextColor('white')
                ;

            this._pw = Crafty.e('TextInput')
                .TextInput( this.x + 57, this.y + 134, 185, 20, 25, true)
                .setTextColor('white')
            ;

            this._backBtn = Crafty.e('FunctionButton')
                .setPos(this.x + 182, this.y + 202)
                .setSize(60, 24)
                .setName('Back')
                .setColor('none')
                .setTextColor('white')
                .setFunction(function(){
                    this
                        .tween({
                            alpha: 0.0,
                            y: this.y - 300
                        }, 500)
                        .bind('TweenEnd',  function(){
                            this.destroy();
                        })
                    ;
                }, this)
            ;

            this._loginBtn = Crafty.e('FunctionButton')
                .setPos(this.x + 58, this.y + 202)
                .setSize(60, 24)
                .setName('Login')
                .setColor('none')
                .setTextColor('white')
                .setFunction(function(){
                    game.sendLoginUser( this.getCredentials() );
                }, this)
            ;

            this.attach(this._username, this._pw, this._backBtn, this._loginBtn);
        },

        getUsername: function(){
            return this._username._displayText;
        },

        getPassword: function(){
            return this._pw._displayText;
        },

        'getCredentials': function(){
            return {
                username: this.getUsername(),
                password: this.getPassword()
            };
        }
    });

    Crafty.c('CreatePanel', {
        required: "2D, DOM, Text, spr_create_form",

        init: function(){
            this.attr({
                x: 10,
                y: -300
            });

            //attach the components of the form to this object
            this._username = Crafty.e('TextInput')
                .TextInput(this.x + 57, this.y + 66, 185, 20, 25, false)
                .setTextColor('white')
            ;

            this._pw = Crafty.e('TextInput')
                .TextInput( this.x + 57, this.y + 123, 185, 20, 25, true)
                .setTextColor('white')
            ;

            this._pwconfirm = Crafty.e('TextInput')
                .TextInput( this.x + 57, this.y + 183, 185, 20, 25, true)
                .setTextColor('white')
            ;

            this._backBtn = Crafty.e('FunctionButton')
                .setPos(this.x + 182, this.y + 233)
                .setSize(60, 24)
                .setName('Back')
                .setColor('none')
                .setTextColor('white')
                .setFunction(function(){
                    this
                        .tween({
                            alpha: 0.0,
                            y: this.y - 300
                        }, 500)
                        .bind('TweenEnd',  function(){
                            this.destroy();
                        })
                    ;
                }, this)
            ;

            this._loginBtn = Crafty.e('FunctionButton')
                .setPos(this.x + 58, this.y + 234)
                .setSize(60, 24)
                .setName('Create')
                .setColor('none')
                .setTextColor('white')
                .setFunction(function(){
                    game.sendCreateUser( this.getCredentials() );
                }, this)
            ;

            this.attach(this._username, this._pw, this._pwconfirm, this._backBtn, this._loginBtn);
        },

        getUsername: function(){
            return this._username._displayText;
        },

        getPassword: function(){
            return this._pw._displayText;
        },

        'getCredentials': function(){
            if(this.confirmPassword()){
                return {
                    username: this.getUsername(),
                    password: this.getPassword()
                };
            }
            return false;
        },

        'confirmPassword': function(){
            if( this._pw._displayText.length > 0 ){
                return this._pw._displayText == this._pwconfirm._displayText;
            }
            return false;
        },

    });

    Crafty.c('TopCharPanel', {
        required: "2D, DOM, spr_ui_panel_top, Persist",
        init: function(){
            this.attr({
                x: 0,
                y: 0
            });

            var size = '15px';

            this._name = Crafty.e('2D, DOM, Text, Persist')
                .attr({
                    x: this.x + 66,
                    y: this.y + 12
                })
                .textFont({
                    size: size
                })
                .textColor('white')
            ;

            this._gold = Crafty.e('2D, DOM, Text, Persist')
                .attr({
                    x: this.x + 57,
                    y: this.y + 44
                })
                .textFont({
                    size: size
                })
                .textColor('#FFD800')
            ;

            this._energy = Crafty.e('2D, DOM, Text, Persist')
                .attr({
                    x: this.x + 226,
                    y: this.y + 44
                })
                .textFont({
                    size: size
                })
                .textColor('#00FFFF')
            ;

            this.attach(this._name, this._gold, this._energy);
        },
        TopCharPanel: function(name, gold, energy){
            this._name
                .text(name)
            ;

            this._gold
                .text(gold)
            ;

            this._energy
                .text(energy)
            ;
            return this;
        }
    });

    Crafty.c('BottomCharPanelTile', {
        required: "2D, DOM, Color, Persist",
        init: function(){
            this.attr({
                w: 48,
                h: 48
            });

            this._sprite = null;
        },

        setColor: function(c){
            this.color(c);
            return this;
        },

        setPos: function(x, y){
            this.attr({
                x: x,
                y: y
            });
            return this;
        },

        setSprite: function(s){
            if(this._sprite != null){
                this.removeComponent(this._sprite);
            }
            this.addComponent(s)
                .crop(8, 8, 48, 48);
            this._sprite = s;

            return this;
        }
    });

    Crafty.c('BottomCharPanel', {
        required: "2D, DOM, spr_ui_panel_bottom, Persist",
        init: function(){
            this.attr({
                x: 0,
                y: game.getWindowHeight() - 74
            });

            this._red = Crafty.e('BottomCharPanelTile')
                .setPos(this.x + 47, this.y + 13)
                .setColor('#990000');
            this._blue = Crafty.e('BottomCharPanelTile')
                .setPos(this.x + 105, this.y + 13)
                .setColor('#000099');
            this._green = Crafty.e('BottomCharPanelTile')
                .setPos(this.x + 163, this.y + 13)
                .setColor('#009900');
            this._yellow = Crafty.e('BottomCharPanelTile')
                .setPos(this.x + 221, this.y + 13)
                .setColor('#999900');

            this._rightBtn = Crafty.e("ImageButton, Persist")
                .setPos(
                    game.getWindowWidth() - 5 - 32,
                    game.getWindowHeight() - 5 - 64
                )
                .setSize(32, 64)
                .setFunction(function(){
                    if(this._index > 2){
                        this._index = 0;
                    }
                    else {
                        this._index ++;
                    }

                    this.setTeamIndex(this._index);
                }, this)
            ;

            this._leftBtn = Crafty.e("ImageButton, Persist")
                .setPos(
                    5,
                    game.getWindowHeight() - 5 - 64
                )
                .setSize(32, 64)
                .setFunction(function(){
                    if(this._index < 1){
                        this._index = 3;
                    }
                    else {
                        this._index --;
                    }

                    this.setTeamIndex(this._index);
                }, this)
            ;

            this.attach(this._leftBtn, this._rightBtn, this._red, this._blue, this._green, this._yellow);
        },

        BottomCharPanel: function(teams){
            this._teams = teams;
            return this;
        },

        setTeamIndex: function(i){
            this._index = i;
            if(i < this._teams.length){
                this._activeTeam = this._teams[i];
            }

            var t = this._activeTeam;
            console.log(t);
            for(color in t){
                if (t.hasOwnProperty(color)) {
                    if(t[color] == null){
                        this['_'+color]
                            .setSprite('spr_unit_?')
                            ;
                    }
                    else {
                        this['_'+color]
                            .setSprite(t[color].spr)
                            ;
                    }

                }
            }

            return this;
        }
    });

    //grid related objects ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //grid obj
    Crafty.c('Tile', {
        required: "2D, DOM",

        init: function(){
            this.attr({
                w: 32,
                h: 32
            });

            this._selected = false;
        },

        //constructor function
        Tile: function(xOff, yOff){
            //set the offset for the tile based on where the grid actually is
            this.attr({
                xOff: xOff,
                yOff: yOff
            });

            return this;
        },

        place: function(x, y){
            //x and y arguments should be coordinates on the grid
            this.attr({
                x: this.xOff + (x*this.w),
                y: this.yOff + (y*this.h),
                _gridX: x,
                _gridY: y
            });

            return this;
        },

        initTile: function(xOff, yOff, x, y){

            //initialize the tile inside, then place it
            this.Tile(xOff, yOff)
                .place(x, y);

            return this;
        },

        //public function to handle when a tile is selected by player (hovered while clicking)
        select: function(){
            this._selected = true;
            this.setHighlight(true);

            //here we indicate that the tile is selected with some sort of animation or glowing
        },

        //deslect a tile without consuming it, basically setting highlight off
        release: function(){
            this._selected = false;
            this.setHighlight(false);
        },

        //public function to handle when a tile is consumed by player. (after pressing space)
        consume: function(newType){
            this._selected = false;

            //remove current type from tile
            this.removeComponent(this._tileType);
            this.removeComponent(this._idleColor);
            this.removeComponent(this._selectColor);

            this.addComponent(newType);
        },

        swap: function(newType){
            //remove current type from tile
            this.removeComponent(this._tileType);
            this.removeComponent(this._idleColor);
            this.removeComponent(this._selectColor);

            this.addComponent(newType);

            if(this._selected){
                //if the swapped tile is still selected, make sure it is still highlighted
                this.addComponent(this._selectColor);
                this.removeComponent(this._idleColor);
            }
        },

        setHighlight: function(h){
                this.toggleComponent(this._selectColor + ',' + this._idleColor);
        }
    });

    //grid
    Crafty.c('GameGrid', {

        required: '2D, Mouse',

        _cellWidth: 32,
        _cellHeight: 32,

        _rows: 6,
        _cols: 10,

        //boolean to tell when mouse is active
        _active: false,

        _nativeTileTypes: [
            {
                component: "RedTile",
                probability: .22
            },
            {
                component: "BlueTile",
                probability: .22
            },
            {
                component: "GreenTile",
                probability: .22
            },
            {
                component: "YellowTile",
                probability: .22
            },
            {
                component: "HeartTile",
                probability: .12
            }
        ],
        _addedTileTypes: [
            {
                component: 'PoisonTile',
                probability: .05
            },
            {
                component: 'native'
            }
        ],

        _nativeProbability: [],
        _tileProbability: [],

        _selectedTiles: [],
        _selectedMaxCount: 10,

        init: function(){

            this.bind('MouseDown', function(e){

                //on a new click if there are slected tiles already, get clean the list
                var size = this._selectedTiles.length;
                if( size > 0 ){
                    for(var i=0; i<size; i++){
                        var currentTile = this._selectedTiles[i];
                        currentTile.release();
                    }
                    this._selectedTiles.length = 0;
                }

                if( e.mouseButton == Crafty.mouseButtons.LEFT )
                    this._active = true;
            });

            this.bind('MouseMove', function(e){
                if(this._active){
                    var x = Math.floor( (e.realX - this.x) /this._cellWidth),
                        y = Math.floor( (e.realY - this.y) /this._cellHeight);

                    var tile = this._grid[y][x];
                    if(this._selectedTiles.length < this._selectedMaxCount){
                        if(!tile._selected){
                            this._selectedTiles.push(tile);
                            tile.select();
                        }
                    }
                }
            });

            this.bind('MouseUp', function(e){
                if( e.mouseButton == Crafty.mouseButtons.LEFT )
                    this._active = false;
            });

        },

        Grid: function(x, y){
            this.attr({
                w: this._cellWidth * this._cols,
                h: this._cellHeight * this._rows,
                x: x,
                y: y
            });
            this.setTileProbability();

            this._grid = new Array(this._rows);

            // i is rows/y, j is cols/x
            for(var i=0; i<this._grid.length; i++){
                this._grid[i] = new Array(this._cols);
                for(var j=0; j<this._grid[i].length; j++){
                    this._grid[i][j] = new Crafty.e()
                        .addComponent(this.getRandomTile())
                        .initTile(this.x, this.y, j, i)
                    ;
                }
            }

            return this;
        },

        //set the probability array for all tiles
        setTileProbability: function(){
            //sets the probability array for the tiles
            var i,
                sum = 0,
                size = this._nativeTileTypes.length - 1;

            //make sure array is right size, cut off ends or add new size
            this._nativeProbability.length = size;

            for(i=0; i<size; i++){
                sum += this._nativeTileTypes[i].probability;
                this._nativeProbability[i] = sum;
            }

            //set up the probability for all tiles (added feature)
            var aSum = 0,
                aSize = this._addedTileTypes.length - 1;

            this._tileProbability.length = aSize;

            for(i=0; i<aSize; i++){
                aSum += this._addedTileTypes[i].probability;
                this._tileProbability[i] = aSum;
            }
        },

        //gets a random tile from the probability array
        getRandomTile: function(){

            var ar = this._tileProbability;
            var r = Math.random(); // returns [0,1]

            //used to just iterate
            for (i=0 ; i<ar.length && r>=ar[i] ; i++) ;

            // Finally execute the function and return its result

            if( this._addedTileTypes[i].component == 'native'){
                var np = this._nativeProbability;
                var nr = Math.random();

                for (i=0 ; i<np.length && nr>=np[i] ; i++) ;
                return this._nativeTileTypes[i].component;
            }
            else{
                return this._addedTileTypes[i].component;
            }
        },

        //adds a tile type to the current list and refresh the probability array
        addTileType: function(type, probability){

            //create object probability
            var obj = {
                component: type,
                probability: probability
            };

            this._addedTileTypes.push(obj);
            this.setTileProbability();
        },

        swapTiles: function(){

        }

    });

    Crafty.c('HpBar', {
        'required': '2D, DOM',

        'init': function(){
            this._borderPadding = 2;
            this._fullBorder = game.getWindowHeight() - 6*32 - 80;
            this._fullBar = this._fullBorder - 2*this._borderPadding;

            //console.log("Start Height: " + this._fullBar);
        },

        'HpBar': function(max){

            this.max = max;
            this.curr = max;

            this._barBackground = Crafty.e("2D, DOM, Color")
                .attr({
                    w: 10 + this._borderPadding * 2,
                    h: this._fullBorder,
                    x: 0,
                    y: 0
                })
                .color('black')
            ;

            this._barDisplay = Crafty.e("2D, DOM, Color, Tween")
                .attr({
                    w: 10,
                    h: this._fullBar,
                    x: this._borderPadding,
                    y: this._borderPadding
                })
                .color('pink')
            ;

            return this;
        },

        setHpDmg: function(dmg){
            if(this.curr - dmg < 0) {
                this.curr = 0;
            }
            else{
                this.curr -= dmg;
            }

            var pct = parseFloat(this.curr) / this.max,
                health = pct * this._fullBar,

                newY = this._borderPadding + ( this._fullBar - health );

            this._barDisplay
                .tween({
                    h: health,
                    y: newY
                }, 1000)
            ;

            return this;
        },

        getCurrHp: function(){
            return this.curr;
        }

    });

    Crafty.c('EnemyHpBar', {
        required: '2D, DOM',

        init: function(){
            this._borderPadding = 2;

            //height of the entire hp bar including border
            this._fullBorder = game.getWindowHeight() - 6*32 - 80;

            //initial height og the bar with just hp
            this._fullBar = this._fullBorder - 2*this._borderPadding;
        },

        EnemyHpBar: function(max){
            this.max = max;
            this.curr = max;

            var barWidth = 10,
                x = game.getWindowWidth() - barWidth;

            this._barBackground = Crafty.e("2D, DOM, Color")
                .attr({
                    w: 10 + this._borderPadding * 2,
                    h: this._fullBorder,
                    x: x - this._borderPadding * 2,
                    y: 0
                })
                .color('black')
            ;

            this._barDisplay = Crafty.e("2D, DOM, Color, Tween")
                .attr({
                    w: 10,
                    h: this._fullBar,
                    x: x - this._borderPadding,
                    y: this._borderPadding
                })
                .color('red')
            ;

            return this;
        },

        setHpDmg: function(dmg){
            if(this.curr - dmg < 1) {
                this.curr = 0;
                return true;
            }
            else{
                this.curr -= dmg;
            }

            var pct = parseFloat(this.curr) / this.max,
                health = pct * this._fullBar,

                newY = this._borderPadding + ( this._fullBar - health );

            this._barDisplay
                .tween({
                    h: health,
                    y: newY
                }, 1000)
            ;

            return false;
        }
    });

    //tile types~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    Crafty.c('RedTile', {
        required: 'Tile',

        init: function(){

            this._idleColor = 'spr_red_tile';
            this._selectColor = 'spr_red_tile_lite';

            this.addComponent(this._idleColor);
            this._tileType = 'RedTile';
        }
    });

    Crafty.c('BlueTile', {
        required: 'Tile',

        init: function(){

            this._idleColor = 'spr_blue_tile';
            this._selectColor = 'spr_blue_tile_lite';

            this.addComponent(this._idleColor);
            this._tileType = 'BlueTile';
        }
    });

    Crafty.c('GreenTile', {
        required: 'Tile',

        init: function(){

            this._idleColor = 'spr_green_tile';
            this._selectColor = 'spr_green_tile_lite';

            this.addComponent(this._idleColor);
            this._tileType = 'GreenTile';
        }
    });

    Crafty.c('YellowTile', {
        required: 'Tile',

        init: function(){

            this._idleColor = 'spr_yellow_tile';
            this._selectColor = 'spr_yellow_tile_lite';

            this.addComponent(this._idleColor);
            this._tileType = 'YellowTile';
        }
    });

    Crafty.c('HeartTile', {
        required: 'Tile',

        init: function(){

            this._idleColor = 'spr_heart_tile';
            this._selectColor = 'spr_heart_tile_lite';

            this.addComponent(this._idleColor);
            this._tileType = 'HeartTile';
        }
    });

    Crafty.c('PoisonTile', {
        required: 'Tile',

        init: function(){

            this._idleColor = 'spr_poison_tile';
            this._selectColor = 'spr_poison_tile_lite';

            this.addComponent(this._idleColor);
            this._tileType = 'PoisonTile';
        }
    });

    //game controllers~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    Crafty.c('GameTimer', {
        //the game timer should handle execution of enemy attacks and display to player time elapsed
        'required': '2D, DOM, Text, Delay',
        _startTime: null,
        _enemySkillTimers: {},

        'init': function(){
            this
                .attr({
                    w: game.getWindowWidth() - 14*2,
                    h: 25,
                    x: 14,
                    y: 10
                })
                .css({
                    'text-align': 'center',
                    'vertical-align': 'middle'
                })
                .textColor('black')
            ;

            return this;
        },

        'GameTimer': function(ctrl, enemies){
            //pass in enemy skill object to initiate timer.
            this._startTime = new Date();

            //iterate through each enemy to set each one up
            for(var i=0; i<enemies.length; i++){
                var skills = enemies[i].enemySkills,
                    name = enemies[i].name;

                this._enemySkillTimers[name] = {};

                //iterate through each enemy skill to create call back for each one
                for(var j=0; j<skills.length; j++){
                    var skill = skills[j],
                        skillCallback = createSkillFunction(ctrl, skill, enemies[i].componentName);

                    this._enemySkillTimers[name] = new Timer(this, skillCallback, skill.timer, skill.frequency);
                }

            }

            return this;
        },

        events: {
            'EnterFrame' : function(eventData){
                if(this._startTime == null){
                    this.text('Timer: None');
                }
                else{
                    var time = Math.floor((new Date() - this._startTime) / 1000);
                    this.text('Timer: ' + time);
                }
            }
        }
    });

    Crafty.c('TeamCtrl', {
        required: 'Delay',

        //object to hold the timers for skills if they are paused by effects
        _skillPauseTimers: {
            red: null,
            blue: null,
            green: null,
            yellow: null
        },

        init: function(){
            this._frame = Crafty.e("2D, DOM, TeamFrame")
                .attr({
                    w: 320,
                    h: 80,
                    x: 0,
                    y: game.getWindowHeight() - 6*32 /*grid height*/ - 80 /*self height*/ //- 10 //hp bar height
                })
            ;
        },

        TeamCtrl: function(team){

            var borderPadding = 8,
                cell_w = 64,
                unit_y = this._frame.y + borderPadding,
                x = this._frame.x;

            //set up the player team
            this._redUnit = Crafty.e(team.redUnit)
                .setPos(x + borderPadding, unit_y)
            ;

            this._blueUnit = Crafty.e(team.blueUnit)
                .setPos(x + 3*borderPadding + cell_w, unit_y)
            ;

            this._greenUnit = Crafty.e(team.greenUnit)
                .setPos(x + 5*borderPadding + 2*cell_w, unit_y)
            ;

            this._yellowUnit = Crafty.e(team.yellowUnit)
                .setPos(x + 7*borderPadding + 3*cell_w, unit_y)
            ;

            this._maxHP = this._redUnit._baseHealth +
                this._blueUnit._baseHealth +
                this._greenUnit._baseHealth +
                this._yellowUnit._baseHealth;

            this._hpBar = Crafty.e('HpBar')
                .HpBar(this._maxHP * 100)
            ;

            return this;
        },

        takeDamage: function(damage){
            this._hpBar.setHpDmg(damage);
        },

        getDamage: function(data){
            //distribute the data to the characters
            var redDamage    = this._redUnit.getDamage(data),
                blueDamage   = this._blueUnit.getDamage(data),
                greenDamage  = this._greenUnit.getDamage(data),
                yellowDamage = this._yellowUnit.getDamage(data);

            return {
                redDamage: redDamage,
                blueDamage: blueDamage,
                greenDamage: greenDamage,
                yellowDamage: yellowDamage
            };
        },

        getHeal: function(){
            var redHeal    = this._redUnit.getHeal(data),
                blueHeal   = this._blueUnit.getHeal(data),
                greenHeal  = this._greenUnit.getHeal(data),
                yellowHeal = this._yellowUnit.getHeal(data);

            return {
                redHeal: redHeal,
                blueHeal: blueHeal,
                greenHeal: greenHeal,
                yellowHeal: yellowHeal
            };
        },

        useActive: function(color){
            switch(color){
                case 'red':
                    this._redUnit.trigger('Active Skill');
                    break;
                case 'blue':
                    this._blueUnit.trigger('Active Skill');
                    break;
                case 'green':
                    this._greenUnit.trigger('Active Skill');
                    break;
                case 'yellow':
                    this._yellowUnit.trigger('Active Skill');
                    break;
            }
        },

        //to pause active we need to know unit color and duration. should handle pausing multiple units
        //should pass in array that contains objects with attributes color and duration.
        pauseActive: function(array){
            for(var i=0; i<array.length; i++){
                //current values
                var c = array[i];
                switch(c.color){
                    default:
                        console.log(c.color + ' invalid color');
                        break;
                    case 'red':
                            this._skillPauseTimers.red = this._redUnit.pauseActiveTimer(c.duration);
                        break;
                    case 'blue':
                            this._skillPauseTimers.blue = this._blueUnit.pauseActiveTimer(c.duration);
                        break;
                    case 'green':
                            this._skillPauseTimers.green = this._greenUnit.pauseActiveTimer(c.duration);
                        break;
                    case 'yellow':
                            this._skillPauseTimers.yellow = this._yellowUnit.pauseActiveTimer(c.duration);
                        break;
                }
            }
        }
    });

    Crafty.c('EnemyCtrl', {
        required: 'Delay',
        init: function(){
            this._activeEnemy = [];
        },

        EnemyCtrl: function(enemyAry){
            //enemyAry is an array holding the objects of all the enemys in the level
            this._enemyAry = enemyAry;

            //get first element of enemy array and create it
            var enemyType = this._enemyAry.shift();

            //check if enemyType is array.
            if(enemyType.constructor === Array){
                //if the enemy type is array, then initialize multiple enemies to the scene
            }
            else if(enemyType.constructor === String ){
                //single instance init one enemy
                this._activeEnemy.push( this.initEnemy(enemyType) );
            }


            return this;
        },

        initEnemy: function(enemy){

            var e = Crafty.e(enemy)
                .setPos( game.getWindowWidth()/2 - 64, 75)
            ;

            this._enemyHpBar = Crafty.e('EnemyHpBar')
                .EnemyHpBar(1000000)
            ;

            return e;
        },

        takeDamage: function(damage){
            var isDead = this._enemyHpBar.setHpDmg(damage);

            if(isDead){
                //init next enemy.

                //if no more enemies, clear room
            }
        },

        getSkills: function(){
            return this._activeEnemy;
        },

        showSkill: function(enemyName, skillName){
            Crafty(enemyName).get(0).showSkill(skillName);
        }
    });

    Crafty.c('GameCtrl', {
        required: '',

        init: function(){

            this._gameGrid = Crafty.e('GameGrid')
                .Grid(0, game.getWindowHeight() - 192)
            ;

            this._gameTeam = Crafty.e('TeamCtrl')
                //
            ;

            this._gameEnemies = Crafty.e('EnemyCtrl')
                //
            ;

            this._timer = Crafty.e('GameTimer');

        },

        GameCtrl: function(level, team){
            this._currLevel = level;

            //initialize the team controller
            this._gameTeam
                .TeamCtrl(team)
            ;

            //initialize enemy controller
            this._gameEnemies
                .EnemyCtrl(level.enemyArray)
            ;

            this._timer
                .GameTimer(this, this._gameEnemies.getSkills() )
            ;

            //key bindings
            this.bind('KeyDown', function(e){

                switch(e.key){
                    case Crafty.keys.SPACE:
                        var tiles = this._gameGrid._selectedTiles;
                        var data = getSelectData(tiles);

                        //player damage conditions
                        var damageValues = this._gameTeam.getDamage(data);

                        //player heal conditions
                        //var healValues = this._gameTeam.getHeal(data);

                        //boss damage conditions, here boss takes 'damageValues' and mods them based on skills/buffs

                        //boss heal conditions, same as above but for heals

                        //temp sample dmg
                        var finalDmg = 0;
                        for(var type in damageValues){
                            if (damageValues.hasOwnProperty(type)) {
                                finalDmg += damageValues[type];
                            }
                        }

                        this._gameEnemies.takeDamage(finalDmg);
                        //this._gameTeam.heal(amount);

                        for(var i=0; i<tiles.length; i++){
                            tiles[i].consume( this._gameGrid.getRandomTile() );
                        }

                        tiles.length = 0;
                        break;

                    //press '1' on keyboard to activate red
                    case 49:
                        this._gameTeam.useActive('red');
                        break;

                    //press '2' for blue
                    case 50:
                        this._gameTeam.useActive('blue');
                        break;

                    //press '3' for green
                    case 51:
                        this._gameTeam.useActive('green');
                        break;

                    //press '4' for yellow
                    case 52:
                        this._gameTeam.useActive('yellow');
                        break;

                    //for testing the pause effect on red skill
                    case Crafty.keys.P:
                        this._gameTeam.pauseActive([
                            {
                                color: 'red',
                                duration: 3000 //10 seconds
                            }
                        ]);
                        break;
                }
            });
        }
    });

    Crafty.c('MenuCtrl', {
        required: 'Tween, Delay, Persist',

        _states: [
            "MainMenu",
            "Dungeons",
            "Teams",
            "Inventory",
            "Shop"
        ],

        _menuBtns: [],

        init: function(){

        },

        MenuCtrl: function(){
            return this;
        },

        initMenuType: function(type){
            switch(type){
                case 'MainMenu':
                    var offset = 10,
                        start_offset = 30,
                        start_y = 75 + start_offset,
                        btn_h = 51,
                        space = offset + btn_h;

                    this._menuBtns.length = 0;
                    this._menuBtns.push(
                        Crafty.e("MenuButton")
                            .MenuButton('dungeon')
                            .setPos(50, start_y)
                            .setFunction(function(){
                                game.setCurrentScene('DungeonListScene');
                            }, this),

                        Crafty.e("MenuButton")
                            .MenuButton('teams')
                            .setPos(50, start_y + space)
                            .setFunction(function(){
                                console.log('teams')
                            }, this),

                        Crafty.e("MenuButton")
                            .MenuButton('inventory')
                            .setPos(50, start_y + space*2)
                            .setFunction(function(){
                                console.log('inventory')
                            }, this),

                        Crafty.e("MenuButton")
                            .MenuButton('shop')
                            .setPos(50, start_y + space*3)
                            .setFunction(function(){
                                game.setCurrentScene('ShopScene');
                            }, this)
                    );

                    break;
                case 'Dungeons':
                    break;
                case 'Teams':
                    break;
                case 'Inventory':
                    break;
                case 'Shop':

                    Crafty.e("2D, DOM, spr_red_chest_idle, SpriteAnimation, Mouse")
                        .reel("RedChestOpen", 1000, 0, 0, 6)
                        .bind('Click', function(e){
                            this.animate("RedChestOpen", 0);
                            game.getChestPull('red');
                        });
                    break;
            }

            return this;
        }
    });
}

var CenteredButtonList = function(buttonAry, w, h){

    var padding = 10,
        gh = game.getWindowHeight(),
        gw = game.getWindowWidth(),
        count = buttonAry.length,
        total_y = count * h + (count - 1) * padding,
        start_y = gh/2 - total_y/2;

    if(total_y > gh){
        // since the list for dungeons exceeds the height of the window, we want to make a scroll screen
    }

    //iterate throguh the button array to initialize all buttons
    for(var i=0; i<buttonAry.length; i++){

        var btn = buttonAry[i];

        Crafty.e('SceneButton')
            .setPos(gw/2 - w/2, start_y + (h + padding)*i )
            .setSize(w, h)
            .setScene(btn.scene, btn.name)
        ;
    }
};

//helper function to return data about the selection
function getSelectData(tileAry){
    //get data about the shape
    var isColumn = false, colCheck, //if the cleared section is a column
        isRow = false,    rowCheck, //if the cleared section is a row
        isCross = false,            //if the cleared section is a cross pattern
        monoRed = false,    redCount = 0,
        monoBlue = false,   blueCount = 0,
        monoGreen = false,  greenCount = 0,
        monoYellow = false, yellowCount = 0,
        monoHeart = false,  heartCount = 0,
        poisonCount = 0;

    var l = tileAry.length;

    for(var i=0; i<l; i++){
        var tile = tileAry[i];

        if(i == 0){
            //check tile count to see if any shape is possible
            if(l == 6){
                colCheck = tile._gridX;
                isColumn = true;
            }
            else if(l == 10){
                rowCheck = tile._gridY;
                isRow = true;
            }
            else if(l == 5){
                isCross = true;
            }

            //check first tile to see which mono color
            switch(tile._tileType){
                case "RedTile":
                    monoRed = true;
                    break;
                case "BlueTile":
                    monoBlue = true;
                    break;
                case "GreenTile":
                    monoGreen = true;
                    break;
                case "YellowTile":
                    monoYellow = true;
                    break;
                case "HeartTile":
                    monoHeart = true;
                    break;
            }
        }
        else{
            if(isColumn && tile._gridX != colCheck){
                isColumn = false;
            }
            else if(isRow && tile._gridY != rowCheck){
                isRow = false;
            }
            else if(isCross){
                isCross = false;
            }

            if(monoRed && tile._tileType != 'RedTile'){
                monoRed = false;
            }
            else if(monoBlue && tile._tileType != 'BlueTile'){
                monoBlue = false;
            }
            else if(monoGreen && tile._tileType != 'GreenTile'){
                monoGreen = false;
            }
            else if(monoYellow && tile._tileType != 'YellowTile'){
                monoYellow = false;
            }
            else if(monoHeart && tile._tileType != 'HeartTile'){
                monoHeart = false;
            }
        }

        //code for any tile
        switch(tile._tileType){
            case "RedTile":
                redCount++;
                break;
            case "BlueTile":
                blueCount++;
                break;
            case "GreenTile":
                greenCount++;
                break;
            case "YellowTile":
                yellowCount++;
                break;
            case "HeartTile":
                heartCount++;
                break;
            case "PoisonTile":
                poisonCount++;
                break;
        }
    }

    return {
        isColumn : isColumn,
        isRow : isRow,
        isCross : isCross,
        monoRed : monoRed,       redCount : redCount,
        monoBlue : monoBlue,     blueCount : blueCount,
        monoGreen : monoGreen,   greenCount : greenCount,
        monoYellow : monoYellow, yellowCount : yellowCount,
        monoHeart : monoHeart,   heartCount : heartCount
    };
}

function createSkillFunction(ctrl, s, c){
    //we get the effect of a skill and create the call back function
    var functions = [],
        skill = s.effect;

    for(type in skill){
        if(skill.hasOwnProperty(type)){
            var effect = skill[type];

            //when creating functions, assume that 'this' variable is the GameCtrl. they will execute that way
            switch(type){
                case 'Delay':
                    functions.push(function(){
                        var delays = [],
                            e = skill['Delay'];
                        for(var x=0; x<e.targets.length; x++){
                            var obj = {
                                color: e.targets[x],
                                duration: e.duration
                            };
                            delays.push(obj);
                        }
                        this._gameTeam.pauseActive(delays);
                    });
                    break;

                case 'Attack':
                    functions.push(function(){
                        var e = skill['Attack'];
                        this._gameTeam.takeDamage(e.damage);
                    });
                    break;

                case 'TileSwap':
                    functions.push(function(){
                        var e = skill['TileSwap'];
                        for(var y=0; y< e.swaps.length; y++){
                            var pair = e.swaps[y];
                            Crafty(pair[0]).each(function(){
                                this.swap(pair[1]);
                            });
                        }
                    });
                    break;
            }
        }
    }

    return function(){
        for(var n=0; n<functions.length; n++){
            functions[n].call(ctrl);
        }
        ctrl._gameEnemies.showSkill(c, s.name);
    };
}