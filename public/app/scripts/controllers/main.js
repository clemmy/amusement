'use strict';

angular.module('amusement')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'poller', 'musePackets'];

function MainCtrl($scope, poller, musePackets) {
    var self = this;
    $scope.MainCtrl = self;

    self.getState = getState;

    pollMusePackets();

    function getState() {
        return {
            name: 'Neutral',
            value: 50
        };
    }

    function pollMusePackets() {
        var musePacketPoller = poller.get(musePackets, {action: 'get', delay: 1000});

        musePacketPoller.promise.then(null, null, function (data) {
            console.log('done');
        });

    }
}
