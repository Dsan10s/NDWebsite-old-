var Admin = require('../../data/models/admin');

function loadAdmin(req, res, next) {
  Admin.findOne({username: req.params.name}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Not found', 404);
    }
    req.user = user;
    next();
  });
}

module.exports = loadAdmin;