function EnemyComponentInit(){

    Crafty.c("Enemy", {
        required: "2D, DOM, Text, Tween, Delay",

        init: function(){

        },

        setPos: function(x, y){
            this.attr({
                x: x,
                y: y
            });

            return this;
        },

        showSkill: function(name){
            var x = 14,
                y = this.y - 10 - Crafty('SkillName').length * 15;

            Crafty.e('2D, DOM, Tween, Text, SkillName')
                .attr({
                    w: game.getWindowWidth() - 14*2,
                    h: 25,
                    x: x,
                    y: y,
                    alpha: 1.0
                })
                .css({
                    'text-align': 'center',
                    'vertical-align': 'middle'
                })
                .text(name)
                .textColor('black')
                .tween({
                    alpha: 0.0
                }, 2000)
                .bind('TweenEnd',  function(){
                    this.destroy();
                })
            ;
        },

        takeDamage: function(){

        }
    });

    Crafty.c('PirateShark', {
        required: 'Enemy, spr_enemy_004',
        name: 'Pirate Shark',
        componentName: 'PirateShark',
        init: function(){

        },

        enemySkills:[
            {
                name: 'Skill 1 - Delay R/B',
                timer: 20000,
                frequency: -1, //continuous
                animation: null, //the sprite animation

                //effect should be a list of objects that define the effects
                effect: {
                    Delay: {
                        targets: ['red', 'blue'], //of red and blue unit
                        duration: 7000 //for 7 sec
                    },
                    Attack: {
                        damage: 100
                    }
                }
            },
            {
                name: 'Skill 2 - Attack',
                timer: 10000,
                frequency: -1,
                animation: null,
                effect: {
                    Attack: {
                        damage: 1000
                    }
                }
            },
            {
                name: 'Skill 3 - Tile Swap H->P',
                timer: 15000,
                frequency: -1,
                animation: null,
                effect: {
                    TileSwap: {
                        swaps:[
                            ['HeartTile', 'PoisonTile']
                        ]
                    }
                }
            }
        ],

        event: function(){

        }
    });

}


