var dgram = require('dgram');
var server = dgram.createSocket("udp4");
var osc = require('osc-min');
var _ = require('lodash');

server.on("error", function (err) {
    console.log("server error:\n" + err.stack);
    server.close();
});

server.on("message", function (msg, rinfo) {
    var error;
    try {
        var oscData = osc.fromBuffer(msg);

        //if (oscData.address === '/muse/elements/experimental') {
        if (_.contains(oscData.address, '/muse/elements/experimental')) {
            return console.log(osc.fromBuffer(msg));
        }
    } catch (_error) {
        error = _error;
        return console.log("invalid OSC packet");
    }
});

server.on("listening", function () {
    var address = server.address();
    console.log("Listening to muse on " +
    address.address + ":" + address.port);
});

server.bind(5000);