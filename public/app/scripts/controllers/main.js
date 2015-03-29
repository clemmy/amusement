'use strict';

angular.module('amusement')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'poller', 'musePackets', 'ngAudio', 'Spotify'];

function MainCtrl($scope, poller, musePackets, ngAudio, Spotify) {
    var self = this;
    $scope.MainCtrl = self;

    self.startedDriving = false;
    self.startDriving = startDriving;
    self.getState = getState;
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
    self.currentAudio = null;
    self.logOnToSpotify = logOnToSpotify;

    function startDriving() {
        self.startedDriving = true;
    }

    function getState() {
        var stateName;

        if (self.normalizedConcentration>= 0 && self.normalizedConcentration <= 33.3333) { //Sleepy
            stateName = 'Sleepy';
            if (stateName !== self.previousState) {
                playAudio(Math.random() * 100 % self.loudTracks.length);
            }
        } else if (self.normalizedConcentration >=33.3333 && self.normalizedConcentration <= 66.6666) { //Neutral
            stateName = 'Neutral';
            if (stateName !== self.previousState) {
                stopAudio();
            }
        } else if (self.normalizedConcentration >= 66.6666 && self.normalizedConcentration <= 100) { //Raging
            stateName = 'Raging';
            if (stateName !== self.previousState) {
                playAudio(Math.random() * 100 % self.calmingTracks.length);
            }
        } else {
            stateName = 'Unknown';
            stopAudio();
        }

        self.previousState = stateName;
        return {
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
            console.log('Packets received.');
        });
    }

    function playAudio(url) {
        self.currentAudio = ngAudio.play(url);
    }

    function stopAudio() {
        self.currentAudio.stop();
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
