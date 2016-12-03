(function(){

    angular.module('main.controllers')
        .controller('demographicsCtrl', ['$scope', '$http',
            function($scope, $http){
                $scope.artistId = '1013863'; //hard coded value should be dynamic
                $scope.artistData = {};
                $scope.modeList = [
                    {
                        name : "Listener Population",
                        color : "37,.91,.55",
                        mode: 0,
                        blocks : [
                            {
                                "block-name" : "Most Relative Listeners",
                                metric : "tc",
                                compare : "high",
                                sample : "California, New York, Texas",
                                count : 3
                            },
                            {
                                "block-name" : "Least Relative Listeners",
                                metric : "tc",
                                compare : "low",
                                sample : "Wyoming, Vermont, S. Dakota",
                                count : 3
                            }
                        ],
                        radials : [
                            {
                                value: 0.35,
                                name: "streams"
                            },
                            {
                                value: 0.87,
                                name: "people"
                            }
                        ],
                        gradient : {
                            max : 1,
                            min : 0
                        }
                    },
                    {
                        name : "Stream Rate",
                        color : "171,.56,.51",
                        mode: 1,
                        blocks : [
                            {
                                "block-name" : "Highest Streaming Areas",
                                metric : "ts",
                                compare: "high",
                                sample : "California, New York, Texas",
                                count : 3
                            },
                            {
                                "block-name" : "Lowest Streaming Areas",
                                metric : "ts",
                                compare: "low",
                                sample : "Wyoming, Vermont, S. Dakota",
                                count : 3
                            }
                        ],
                        radials : [
                            {
                                value: 0.35,
                                name: "streams"
                            },
                            {
                                value: 0.87,
                                name: "people"
                            }
                        ],
                        gradient : {
                            max : 1,
                            min : 0
                        }
                    },
                    {
                        name : "Target Demographic",
                        color : "195,.97,.55",
                        mode: 2,
                        blocks : [
                            {
                                "block-name" : "Markets Most Penetrated",
                                metric : "tc/pop",
                                compare : "high",
                                sample : "California, New York, Texas",
                                count : 3
                            },
                            {
                                "block-name" : "Markets Least Penetrated",
                                metric : "tc/pop",
                                compare : "low",
                                sample : "Wyoming, Vermont, S. Dakota",
                                count : 3
                            }
                        ],
                        radials : [
                            {
                                value: 0.35,
                                name: "streams"
                            },
                            {
                                value: 0.87,
                                name: "people"
                            }
                        ],
                        gradient : {
                            max : 1,
                            min : 0
                        }
                    },
                    {
                        name : "Super Fans",
                        color : "357,.94,.49",
                        mode: 3,
                        blocks : [
                            {
                                "block-name" : "Highest Super Fan Population",
                                metric : "ts/tc",
                                compare : "high",
                                sample : "California, New York, Texas",
                                count : 3
                            }
                        ],
                        radials : [
                            {
                                value: 0.35,
                                name: "streams"
                            },
                            {
                                value: 0.87,
                                name: "people"
                            }
                        ],
                        gradient : {
                            max : 1,
                            min : 0
                        }
                    }
                ];
                $scope.activeMode = 0;

                //place holder for an actual api call
                $scope.updateArtists = function(){
                    $http({
                        method: 'GET',
                        url: '/api/sample/1013863'
                    }).then(function successCallback(response) {
                        $scope.artistData = response.data ;
                    }, function errorCallback(response) {
                        console.log(reponse.text);
                    });
                }
                $scope.updateArtists();



            }]);

})();
