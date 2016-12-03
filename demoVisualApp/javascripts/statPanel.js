(function () {
    'use strict';

    angular.module('main.directives')
        .directive('statPanel', ['d3', 'color_convert', function (d3, cc) {
            return {
                restrict: 'EA',
                scope: {
                    data: "=",
                    modeList: "=",
                    activeMode: "="
                },
                link: function (scope, iElement, iAttrs) {

                    var coin_r = 50,
                        coin_o = 10;

                    var dataTable = $(document.createElement('div'))
                                .addClass('data-table');

                    $(iElement[0])
                        .append(dataTable);

                    var textBlocks = $(document.createElement('div'))
                        .addClass('text-blocks data-section');

                    var gradient = $(document.createElement('div'))
                        .addClass('gradient-display data-section');

                    var radials = $(document.createElement('div'))
                        .addClass('radials data-section row');

                    var stats = $(document.createElement('div'))
                            .addClass('display-stats data-section');

                    dataTable.append(textBlocks, radials, gradient, stats);

                    scope.$watch('activeMode', function(newVals, oldVals) {
                        return updateMode(newVals);
                    });

                    function updateMode(m){

                        var mode = scope.modeList[m],
                            modeRadials = mode['radials'];

                        //get color value from the mode
                        var valueStr = mode["color"];
                        var values = valueStr.split(",");

                        //get the hsl and rgb values form the mode color
                        var hue = values[0];
                        var rgbNum = cc.hslToRgb(hue/360, parseFloat(values[1]), parseFloat(values[2]));
                        var rgb = 'rgb(' + rgbNum[0] + ',' +rgbNum[1] + ',' +rgbNum[2]+')';

                        createCoins(modeRadials, rgb);

                        //change color of gradient
                        $('.gradient-half-colored')
                            .css("background", "-webkit-linear-gradient(left," + rgb + ", grey)")
                            .css("background", "-o-linear-gradient(right," + rgb + ", grey)")
                            .css("background", "-moz-linear-gradient(right," + rgb + ", grey)")
                            .css("background", "linear-gradient(to right," + rgb + ", grey)")
                        ;

                        $(".text-blocks")
                            .attr("rgb", rgb)
                        ;

                        $(".display-stats")
                            .attr("rgb", rgb)
                        ;

                        $(".text-block")
                            .css("background", rgb)
                        ;

                        d3.select('.coin-face')
                            .attr('stroke', rgb);
                    }

                    function createCoins(coins, rgb){
                        //first remove current coins
                        radials.children()
                            .each(function(){
                                $(this).remove();
                            });

                        var circumference = Math.PI * 2 * coin_r;
                        for(var i=0; i<coins.length; i++){

                            var currCoinObj = coins[i],
                                strokeLen = currCoinObj.value * circumference,
                                strokeWhite = circumference - strokeLen;

                            var coin = d3.select('.radials')
                                .append('div')
                                .attr('class', 'col-md-6 coin')
                                .append('svg')
                                .attr({
                                    height: coin_r*2,
                                    width: coin_r*2
                                });

                            coin
                                .append('circle')
                                .attr({
                                    cx : coin_r,
                                    cy : coin_r,
                                    r : coin_r - coin_o/2,
                                    'stroke-width' : coin_o,
                                    stroke : rgb,
                                    'stroke-dasharray' : [
                                        '0,' + strokeWhite,
                                        strokeLen + ',0'
                                    ],
                                    fill : 'grey',
                                    class : 'coin-face'
                                });

                            coin
                                .append('text')
                                .attr({
                                    class : 'coin-text',
                                    'text-anchor' : 'middle',
                                    dx : coin_r + coin_o/2,
                                    dy : coin_r + coin_o/2,
                                    fill : 'white',
                                    'font-weight' : 'bold',
                                    'font-size' : 'large'
                                })
                                .text(currCoinObj.value*100 + '%');
                        }

                        d3.selectAll('.coin')
                            .classed('fadeIn', true)
                    }
                }
            }
        }]);
}());