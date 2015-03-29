'use strict';

angular
    .module('amusement')
    .factory('musePackets', musePackets);

musePackets.$inject = ['$resource'];

function musePackets($resource) {
    return $resource('/api/lastMusePackets');
}
