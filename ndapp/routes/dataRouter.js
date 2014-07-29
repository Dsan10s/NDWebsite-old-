module.exports = function(app) {
  app.get('/data/events', function(req, res) {
    var eventsJSON = require('../data/events');
    res.json(eventsJSON);
  });

  app.get('/data/brothers/:classYear', function(req, res, next) {
    var classYear = req.params.classYear;
    var brothersJSON = require('../data/brothers/' + classYear);
    if (brothersJSON) {
      res.json(brothersJSON);
    } else {
      next();
    }
  });

  app.get('/data/house/imgArray', function(req, res) {
    var imgJSON = require('../data/house/imgArray');
    res.json(imgJSON);
  });
}