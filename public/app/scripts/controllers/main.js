'use strict';

angular.module('amusement')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'poller', 'musePackets', 'ngAudio', 'Spotify'];

function MainCtrl($scope, poller, musePackets, ngAudio, Spotify) {
    var self = this;
    $scope.MainCtrl = self;

    self.startedDriving = false;
    self.startDriving = startDriving;
    self.updateState = updateState;
    self.lastMusePacketsReceived = null;
    self.normalizedConcentration = 50;
    self.playAudio = playAudio;
    self.stopAudio = stopAudio;
    self.calmingTracks = [];
    self.loudTracks = [];
    self.previousState = {
        name: null,
        value: null
    };
    self.currentState = {
        name: null,
        value: null
    };
    self.currentAudio = null;
    self.logOnToSpotify = logOnToSpotify;

    function startDriving() {
        self.startedDriving = true;
    }

    function updateState() {
        var stateName;

        if (self.normalizedConcentration>= 0 && self.normalizedConcentration <= 33.3333) { //Sleepy
            stateName = 'Sleepy';
            if (stateName !== self.previousState.name) {
                playAudio(self.loudTracks[Math.floor(Math.random()*self.loudTracks.length)]);
            }
        } else if (self.normalizedConcentration >=33.3333 && self.normalizedConcentration <= 66.6666) { //Neutral
            stateName = 'Neutral';
            if (stateName !== self.previousState.name) {
                stopAudio();
            }
        } else if (self.normalizedConcentration >= 66.6666 && self.normalizedConcentration <= 100) { //Raging
            stateName = 'Raging';
            if (stateName !== self.previousState.name) {
                playAudio(self.calmingTracks[Math.floor(Math.random()*self.calmingTracks.length)]);
            }
        } else {
            stateName = 'Unknown';
            stopAudio();
        }

        self.previousState = self.currentState;
        self.currentState = {
            name: stateName,
            value: self.normalizedConcentration
        };
    }

    function calculateNormalizedConcentration() {
        return Math.random() * 100;
    }

    function pollMusePackets() {
        var musePacketPoller = poller.get(musePackets, {action: 'get', delay: 3000});

        musePacketPoller.promise.then(null, null, function (data) {
            self.lastMusePacketsReceived = data;
            self.normalizedConcentration = calculateNormalizedConcentration();
            self.updateState();
            console.log('Packets received.');
        });
    }

    function playAudio(url) {
        self.currentAudio = ngAudio.play(url);
    }

    function stopAudio() {
        if (self.currentAudio) {
            self.currentAudio.stop();
        }
    }

    function logOnToSpotify() {
        Spotify.login().then(function(token) {

            Spotify.getPlaylistTracks('kallibri', '6oURs2fLToA0NgO0jvlKLQ').then(function (calmData) {
                var calmTrackUrls = _.map(calmData.items, function(item) {
                    return item.track.preview_url;
                });

                self.calmingTracks = self.calmingTracks.concat(calmTrackUrls);

                Spotify.getPlaylistTracks('kallibri', '6ePaOEazQ3e4WbfIDA2OFR').then(function (loudData) {
                    var loudTrackUrls = _.map(loudData.items, function(item) {
                        return item.track.preview_url;
                    });

                    self.loudTracks = self.loudTracks.concat(loudTrackUrls);

                    pollMusePackets(); // begin polling.
                });
            });
        });

    }
}
