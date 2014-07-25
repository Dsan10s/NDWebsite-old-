module.exports = function(app) {
  app.get('/data/events', function(req, res) {
    var eventsJSON = require('../data/events');
    console.log("events" in eventsJSON);
    res.json(eventsJSON);
  });

  app.get('/data/brothers/:classYear', function(req, res, next) {
    var classYear = req.params.classYear;
    var brothersJSON = require('../data/brothers/' + classYear);
    res.json(brothersJSON);
  });
}