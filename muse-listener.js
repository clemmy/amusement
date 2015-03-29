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

        if (oscData.address === '/muse/elements/experimental/mellow') {
            global.lastMellowOscData = oscData;
        } else if (oscData.address === '/muse/elements/experimental/concentration') {
            global.lastConcentrationOscData = oscData;
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