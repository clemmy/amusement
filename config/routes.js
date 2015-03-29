module.exports = function (app) {

    app.get('/api/lastMusePackets', function (req, res, next) {
        res.status(200).send({
            concentration: global.lastConcentrationOscData,
            mellow: global.lastMellowOscData
        });
    });
}