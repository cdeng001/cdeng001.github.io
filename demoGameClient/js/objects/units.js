function UnitComponentInit(){
    Crafty.c('Unit', {
        required: '2D, DOM, Mouse, Tween, Text, Delay',
        _activeReady: false,
        _activeTimer: null,
        _activeSetTrue: function(){
            this._activeReady = true;
            this._activeTimer = null;
        },

        _delayTimer: null,

        init: function(){
            this.attr({
                w: 64,
                h: 64
            });
        },

        getDamage: function(data){

            //data variable should have array of tiles and the shape of the tiles selected (row, column, cross)

            var damage = 0;
            //run the characters condition function, this is a custom damage calc based on the character
            if(this._damageCondition instanceof Function){
                damage = this._damageCondition(data);
            }

            //below here we might have a standard damage calculation or something

            //get crit damage
            var isCrit = false,
                color = 'white'; //default damage color


            if(Math.random() < this._criticalChance){
                isCrit = true;
                damage = 2 * damage;
                color = 'red'; //critical strike
            }

            if(damage > 0){
                this.showDamage(damage, color);
            }

            return damage;
        },

        events: {
            'EnterFrame': function(eventData){

                if(this._delayTimer != null){
                    var sd = Math.floor(this._delayTimer.getTimeLeft() / 1000);

                    this
                        .textColor('red')
                        .text(sd);
                }
                else if(this._activeTimer != null){
                    var sa = Math.floor(this._activeTimer.getTimeLeft() / 1000);

                    this
                        .textColor('black')
                        .text(sa);
                }
                else{
                    this
                        .textColor('black')
                        .text('READY');
                }
            },

            'Active Skill': function(){
                if(this._activeReady && this._delayTimer == null){
                    //set active things here
                    this._abilityFunction();
                    this._activeReady = false;

                    this.startActiveTimer();
                }
                else{
                    console.log('red on cd')
                }
            }
        },

        setPos: function(x, y){
            this.attr({
                x: x,
                y: y
            });

            return this;
        },

        showDamage: function(value, color){
            var x = this.x,
                y = this.y;

            Crafty.e('2D, DOM, Tween, Text')
                .attr({
                    w: 64,
                    h: 25,
                    x: x,
                    y: y,
                    alpha: 1.0
                })
                .css({
                    'text-align': 'center',
                    'vertical-align': 'middle'
                })
                .text(value)
                .textColor(color)
                .tween({
                    alpha: 0.0,
                    y: this.y - 30
                }, 2000)
                .bind('TweenEnd',  function(){
                    this.destroy();
                })
            ;
        },

        startActiveTimer: function(){
            //start the timer
            this._activeTimer = new Timer(this, this._activeSetTrue, this._cooldown, 0);

            return this;
        },

        pauseActiveTimer: function(t){
            if(this._delayTimer != null){
                this._delayTimer.addTime(t);
                return this._delayTimer;
            }

            if(this._activeTimer != null){
                if( this._activeTimer.getStateRunning() ){
                    this._activeTimer.pause();

                    this._delayTimer = new Timer(this, this.resumeActiveTimer, t, 0);

                    return this._delayTimer;
                }
            }
            else{
                this._delayTimer = new Timer(this, this.resumeActiveTimer, t, 0);

                return this._delayTimer;
            }

            return null;
        },

        resumeActiveTimer: function(){
            if(this._activeTimer != null){
                if( !this._activeTimer.getStateRunning() ){
                    this._activeTimer.start();
                    this._delayTimer = null;
                }
            }
            else{
                this._delayTimer = null;
            }
        }
    });

    //commons

    Crafty.c('RedRobot', {
        required: 'Unit, spr_unit_001',

        _baseAttack: 100,
        _baseHealth: 100,
        _baseRecovery: 10,
        _criticalChance: .15,
        _cooldown: 3000,

        init: function(){
            this.startActiveTimer();
        },

        _abilityFunction: function(){
            console.log("clicked red");
        },

        _damageCondition: function(data){
            var damage = data.redCount * this._baseAttack;
            if(data.monoRed){
                damage *= 2;
            }
            return damage;
        }
    });

    Crafty.c('BlueRobot', {
        required: 'Unit, spr_unit_003',

        _baseAttack: 100,
        _baseHealth: 100,
        _baseRecovery: 10,
        _criticalChance: .15,
        _cooldown: 54000,

        init: function(){
            this.startActiveTimer();
        },

        _abilityFunction: function(){
            console.log("clicked blue");
        },

        _damageCondition: function(data){
            var damage = data.blueCount * this._baseAttack;
            if(data.monoBlue){
                damage *= 2;
            }
            return damage;
        }
    });

    Crafty.c('GreenRobot', {
        required: 'Unit, spr_unit_002',

        _baseAttack: 100,
        _baseHealth: 100,
        _baseRecovery: 10,
        _criticalChance: .15,
        _cooldown: 23000,

        init: function(){
            this.startActiveTimer();
        },

        _abilityFunction: function(){
            console.log("clicked green");
        },

        _damageCondition: function(data){
            var damage = data.greenCount * this._baseAttack;
            if(data.monoGreen){
                damage *= 2;
            }
            return damage;
        }
    });

    Crafty.c('YellowRobot', {
        required: 'Unit, spr_unit_004',

        _baseAttack: 100,
        _baseHealth: 100,
        _baseRecovery: 10,
        _criticalChance: .15,
        _cooldown: 43000,

        init: function(){
            this.startActiveTimer();
        },

        _abilityFunction: function(){
            console.log("clicked yellow");
        },

        _damageCondition: function(data){
            var damage = data.yellowCount * this._baseAttack;
            if(data.monoYellow){
                damage *= 2;
            }
            return damage;
        }
    });

    //rares

    Crafty.c('RedDragon', {
        required: "Unit, spr_unit_023"
    });

    Crafty.c('BlueGorilla', {
        required: 'Unit, spr_unit_014'
    });

    Crafty.c('GreenViper', {
        required: 'Unit, spr_unit_024'
    });

    Crafty.c('YellowFalcon', {
        required: 'Unit, spr_unit_016'
    });

    //secret

    Crafty.c('GoldenSun', {
        required: 'Unit, spr_unit_018'
    });

    Crafty.c('RadiantSoldier', {
        required: 'Unit, spr_unit_011'
    });

    Crafty.c('Vimn', {
        required: 'Unit, spr_unit_020'
    });

    Crafty.c("TitaniumHero", {
        required: 'Unit, spr_unit_026'
    })
}
