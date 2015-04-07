var path = require('path');

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

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/app/index.html'));
    });
}
