'use strict';

angular.module('amusement')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'poller', 'musePackets'];

function MainCtrl($scope, poller, musePackets) {
    var self = this;
    $scope.MainCtrl = self;

    self.getState = getState;
    self.lastMusePacketsReceived = null;

    pollMusePackets();

    function getState() {

        var value = calculateNormalizedConcentration();
        var stateName = 'Neutral';

        if (value >= 0 && value <= 33.3333) {
            stateName = 'Sleepy';
        } else if (value >=33.3333 && value <= 66.6666) {
            stateName = 'Neutral';
        } else if (value >= 66.6666 && value <= 100) {
            stateName = 'Raging';
        } else {
            stateName = 'Unknown';
        }

        return {
            name: stateName,
            value: value
        };
    }

    function calculateNormalizedConcentration() {
        return 33;
    }

    function pollMusePackets() {
        var musePacketPoller = poller.get(musePackets, {action: 'get', delay: 1000});

        musePacketPoller.promise.then(null, null, function (data) {
            self.lastMusePacketsReceived = data;
            console.log('Packets received.');
        });

    }
}
