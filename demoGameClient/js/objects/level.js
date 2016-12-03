/*
    A level object is an object that holds all the information about a certain level
    List of all things a level must and can hold:
    - EnemyArray: an array holding all enemy objects in order of spawn for the certain level.
                  keep in mind that if a spawn of an enemy has multiple parts, the object will
                  contain an array of enemies.

                  Example:
                  [
                        { enemy: {enemy obj} },
                        { enemy: [{enemy obj}, {enemy obj}],
                        { enemy: {enemy obj} }
                  ]

 */

var levels = [
    {
        name: "First Level",
        enemyArray: []
    },
    {
        name: "Sample Level",
        enemyArray: [
            'PirateShark'
        ]
    }
];

exports.levels = levels;
