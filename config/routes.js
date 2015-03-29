var path = require('path');

module.exports = function (app) {

    app.get('/api/lastMusePackets', function (req, res, next) {
        res.status(200).send({
            concentration: global.lastConcentrationOscData,
            mellow: global.lastMellowOscData
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(path.resolve('public/app/index.html'));
    });
}