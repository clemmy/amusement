'use strict';

angular.module('amusement')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope'];

function MainCtrl($scope) {
    var self = this;
    $scope.MainCtrl = self;

    self.getState = getState;

    function getState() {
        return 'Neutral';
    }
}
