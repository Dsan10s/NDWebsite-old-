module.exports = function(app) {
  app.get('/data/brotherEvents', function(req, res) {
    var brotherEventsJSON = require('../data/brotherEvents');
    res.json(brotherEventsJSON);
  });
}