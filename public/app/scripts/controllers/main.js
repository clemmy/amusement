'use strict';

angular.module('amusement')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'poller', 'musePackets'];

function MainCtrl($scope, poller, musePackets) {
    var self = this;
    $scope.MainCtrl = self;

    self.startedDriving = false;
    self.startDriving = startDriving;
    self.getState = getState;
    self.lastMusePacketsReceived = null;
    self.normalizedConcentration = 50;

    pollMusePackets();

    function startDriving() {
        self.startedDriving = true;
    }

    function getState() {
        var stateName = 'Neutral';

        if (self.normalizedConcentration>= 0 && self.normalizedConcentration <= 33.3333) {
            stateName = 'Sleepy';
        } else if (self.normalizedConcentration >=33.3333 && self.normalizedConcentration <= 66.6666) {
            stateName = 'Neutral';
        } else if (self.normalizedConcentration >= 66.6666 && self.normalizedConcentration <= 100) {
            stateName = 'Raging';
        } else {
            stateName = 'Unknown';
        }

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
}
