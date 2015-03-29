var path = require('path');
var http = require('http');

module.exports = function (app) {

    app.get('/api/lastMusePackets', function (req, res, next) {
        res.status(200).send({
            concentration: global.lastConcentrationOscData,
            mellow: global.lastMellowOscData
        });
    });

    app.get('/spotify-redirect', function (req, res) {
        res.sendFile(path.resolve('public/spotify-redirect.html'));
    });

    app.get('/api/speech', function(req, res, next) {
        var text = req.query.text;

        //request({
        //    method: 'GET',
        //    url: 'https://montanaflynn-text-to-speech.p.mashape.com/speak' + '?text=' + text.split(' ').join('+'),
        //    headers: {
        //        'X-Mashape-Key' : '5eY1sVyldDmshD6JgKLiz9xeAstUp1TXQREjsnMgMdeLNwbmsp'
        //    },
        //    encoding: 'binary'
        //}, function(error, response, body) {
        //    //res.type('audio/mpeg').send(body);
        //    res.set('Content-Type', 'audio/mpeg; charset=binary');
        //});

        var options = {
            hostname: 'https://montanaflynn-text-to-speech.p.mashape.com',
            path: '/speak?text=hey+man',
            method: 'GET',
            headers: {
                'Content-Type': 'audio/mpeg'
            }
        };

        var req = http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();


    });

    app.get('*', function (req, res) {
        res.sendFile(path.resolve('public/app/index.html'));
    });
}