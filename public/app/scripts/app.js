'use strict';

angular
    .module('amusement', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'frapontillo.gage.directives',
        'emguo.poller',
        'ngAudio',
        'spotify'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function (SpotifyProvider) {
        SpotifyProvider.setClientId('48d07fe1eda04c888c064608a84bb1af'); //TODO: move this over to config file.
        SpotifyProvider.setRedirectUri('http://127.0.0.1:3000/spotify-redirect');
        SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
        //SpotifyProvider.setAuthToken('BQAyqq3XcuC47W4cnAdjfbyuOQXO1YATesLMnrjuIqmegzgcvS79FKFIBZIOo-lItJ5Yc4nZhSCeBDP0LoVulQ');
    });
