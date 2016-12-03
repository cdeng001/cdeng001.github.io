(function () {
    'use strict';

    angular.module('main.directives')
        .directive('modeBar', ['d3', 'color_convert', function (d3, cc) {
            return {
                restrict: 'EA',
                scope: {
                    modeList: "=",
                    activeMode: "="
                },
                link: function (scope, iElement, iAttrs) {

                    var barDiv = $(iElement[0]);

                    //bind hover and click events to toggle buttons, use global delegates
                    $(document).on("mouseenter", ".info-toggle-button", function() {
                        if($(this).hasClass('active')){
                            return;
                        }

                        var values = scope.modeList[$(this).attr('mode')]["color"];
                        var splitValues = values.split(",");
                        var hue = splitValues[0];
                        var hsl = 'hsl(' + hue + ',' + splitValues[1]*100 + '%,' + splitValues[2]*100 + '%)';
                        var rgbNum = cc.hslToRgb(hue/360, parseFloat(splitValues[1]), parseFloat(splitValues[2]));
                        var rgb = 'rgb(' + rgbNum[0] + ',' +rgbNum[1] + ',' +rgbNum[2]+')';

                        $(this).find('.info-toggle-bar').css('background-color', rgb);
                        $(this).find('.info-toggle-button-name').css('color', rgb);
                    });

                    $(document).on("mouseleave", ".info-toggle-button", function() {
                        if($(this).hasClass('active')){
                            return;
                        }

                        $(this).find('.info-toggle-bar').css('background-color', 'rgb(0,0,0)');
                        $(this).find('.info-toggle-button-name').css('color', 'rgb(0,0,0)');
                    });

                    $(document).on("click", ".info-toggle-button", function() {
                        var activeBtn = $('div.info-toggle-button.active');
                        if(activeBtn == $(this)){
                            return;
                        }

                        setBarColor(activeBtn, this);
                        scope.activeMode = $(this).attr('mode');
                        scope.$apply();
                    });

                    function setBarColor(oldActive, newActive){
                        oldActive.find('.info-toggle-bar').css('background-color', 'rgb(0,0,0)');
                        oldActive.find('.info-toggle-button-name').css('color', 'rgb(0,0,0)');
                        oldActive.removeClass('active');

                        var values = scope.modeList[$(newActive).attr('mode')]["color"];
                        var splitValues = values.split(",");
                        var hue = splitValues[0];
                        var hsl = 'hsl(' + hue + ',' + splitValues[1]*100 + '%,' + splitValues[2]*100 + '%)';
                        var rgbNum = cc.hslToRgb(hue/360, parseFloat(splitValues[1]), parseFloat(splitValues[2]));
                        var rgb = 'rgb(' + rgbNum[0] + ',' +rgbNum[1] + ',' +rgbNum[2]+')';

                        $(newActive).addClass('active');
                        $(newActive).find('.info-toggle-bar').css('background-color', rgb);
                        $(newActive).find('.info-toggle-button-name').css('color', rgb);
                    }

                    //when modes are set, display the correct bar
                    scope.$watch('modeList', function(newVals, oldVals) {
                        return setUpBar(newVals);
                    });

                    scope.$watch('activeMode', function(newVals, oldVals) {

                        var target = $('.info-toggle-button[mode="' + newVals + '"]');

                        var values = scope.modeList[newVals]["color"];
                        var splitValues = values.split(",");
                        var hue = splitValues[0];
                        var hsl = 'hsl(' + hue + ',' + splitValues[1]*100 + '%,' + splitValues[2]*100 + '%)';
                        var rgbNum = cc.hslToRgb(hue/360, parseFloat(splitValues[1]), parseFloat(splitValues[2]));
                        var rgb = 'rgb(' + rgbNum[0] + ',' +rgbNum[1] + ',' +rgbNum[2]+')';

                        $(target).addClass('active');
                        $(target).find('.info-toggle-bar').css('background-color', rgb);
                        $(target).find('.info-toggle-button-name').css('color', rgb);

                        return;
                    });

                    function  setUpBar(newList){
                        //here we empty the current modes, and create new modes

                        if(newList == undefined){return;}

                        //first get size of the divs
                        var size = "col-md-" + Math.floor(12/newList.length);

                        for( var i=0; i < newList.length; i++){
                            var mode = newList[i];
                            var div = $( document.createElement('div') )
                                .addClass('info-toggle-button ' + size)
                                .attr('mode', mode.mode)
                                .append(
                                    //append anchor to the div
                                    $( document.createElement('a') )
                                        .append([
                                            $( document.createElement('p') )
                                                .addClass('info-toggle-button-name')
                                                .append(mode.name),
                                            $( document.createElement('span') )
                                                .addClass('info-toggle-bar')
                                        ])
                                );


                            barDiv.append(div);
                        }
                    }
                }
            }
        }]);
}());
