(function(){

    var app = angular.module('main', [
        'angularCSS',
        'ngRoute',
        'main.controllers',
        'main.directives'
    ], function(){});

    //config used to set up routes with their html template + controller

    app.config(function($routeProvider){
        //home
        $routeProvider
            .when('/home', {
                templateUrl: '/partials/home.html',
                controller: 'homeCtrl',
                css: '/stylesheets/home.css'
            })
            /*
            .when('/performance', {
                templateUrl: '/partials/performance.html',
                controller: 'performanceCtrl',
                css: 'stylesheets/performance.css' //change later
            })
            */
            .when('/demographics', {
                templateUrl: '/partials/demographics.html',
                controller: 'demographicsCtrl',
                css: '/stylesheets/demographics.css'
            })
            ;
    });


    angular.module('d3', []);
    angular.module('color_convert', []);
    angular.module('main.controllers', []);
    angular.module('main.directives', ['d3', 'color_convert']);

})();
